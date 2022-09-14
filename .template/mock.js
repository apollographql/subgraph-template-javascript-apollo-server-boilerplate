const { readFileSync } = require("fs");

const gql = require("graphql-tag");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { addMocksToSchema } = require("@graphql-tools/mock");

const port = process.env.PORT ?? 4001;

async function main() {
  const typeDefs = gql(
    readFileSync("src/schema.graphql", {
      encoding: "utf-8",
    })
  );
  const schema = buildSubgraphSchema({ typeDefs });

  const server = new ApolloServer({
    schema: addMocksToSchema({ schema, preserveResolvers: true }),
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ auth: req.headers.authentication }),
    listen: { port },
  });
  console.log(`🚀  Subgraph ready at ${url}`);
}

main();
