const { readFileSync, copyFileSync, rmdirSync, constants } = require("fs");
const prompts = require("prompts");

async function main() {
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
  } else {
    //Clean up template folder
    rmdirSync("./template");
  }
}

main();
