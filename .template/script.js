const { copyFileSync, rm, constants, writeFileSync } = require("fs");
const prompts = require("prompts");

async function main() {
  try {
    const response = await prompts({
      type: "select",
      name: "value",
      message: "Would you like to have the schema mocked using graphql-tools?",
      choices: [
        { title: "Yes", value: "y" },
        { title: "No", value: "n" },
      ],
    });

    if (response == "y") {
      copyFileSync(
        ".template/mock.js",
        "./src/index.js",
        constants.COPYFILE_FICLONE_FORCE
      );
      const fileName = "../package.json";
      const file = require(fileName);
      file.dependencies["graphql-tools"] = "latest";
      writeFileSync(fileName, JSON.stringify(file), { encoding: "utf8" });
    }
  } catch (err) {
    console.log(err);
  }

  //Clean up template folder
  rm("package-lock.json", { force: true }, () => {});
  rm("node_modules", { recursive: true }, () => {});
  rm(".template", { recursive: true }, () => {});
}

main();
