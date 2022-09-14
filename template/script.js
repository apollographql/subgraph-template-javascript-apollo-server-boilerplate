const { resolve } = require("path");
const { copyFile, rm } = require("fs/promises");
const { createInterface } = require("readline");
const { execSync } = require("child_process");

async function main() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    "Would you like to have the schema mocked using graphql-tools?",
    async (answer) => {
      if (answer.toLowerCase()[0] == "y") {
        swapMocks();

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
  console.log("\tCleaning up template files");
  await rm("template", { recursive: true });
}

async function swapMocks() {
  console.log("\tSwapping mocking template in");
  await copyFile(
    resolve(__dirname, "mock.js"),
    resolve(__dirname, "..", "src", "index.js")
  );

  console.log("\tInstalling graphql-tools");
  execSync("npm i graphql-tools");
}
