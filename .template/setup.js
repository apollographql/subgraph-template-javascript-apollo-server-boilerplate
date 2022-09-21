const { resolve } = require("path");
const { copyFile, rm, writeFile } = require("fs/promises");
const { createInterface } = require("readline");
const { execSync } = require("child_process");

async function main() {
  console.log("Setting up Apollo Server Template");
  process.stdout.write("Installing packages...");
  execSync("npm install");

  //Prompt the user if they would like to have mocking enabled
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log("complete");
  rl.question(
    "Would you like to have the schema mocked using graphql-tools?",
    async (answer) => {
      if (answer.toLowerCase()[0] == "y") {
        await swapMocks();

        rl.close();
      }
    }
  );

  rl.on("close", async function () {
    await cleanup();
    process.exit(0);
  });
}

main();

async function cleanup() {
  process.stdout.write("\tCleaning up template files...");
  console.log("complete");
  await rm(".template", { recursive: true });
}

async function swapMocks() {
  process.stdout.write("\tSwapping mocking template in...");
  try {
    await copyFile(
      resolve(__dirname, "mock.js"),
      resolve(__dirname, "..", "src", "index.js")
    );
    console.log("complete");

    process.stdout.write("\tInstalling @graphql-tools/mock...");
    execSync("npm i @graphql-tools/mock");

    const fileName = "../package.json";
    const file = require(fileName);
    delete file.scripts["setup"];

    await writeFile(resolve(fileName), JSON.stringify(file, null, 2));
  } catch (err) {
    console.log(`\n${err}`);
  }
  console.log("complete");
}
