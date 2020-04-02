const { GraphQLServer } = require("graphql-yoga");

const { mutation } = require("./resolvers/Mutation");
const { query } = require("./resolvers/Query");
const db = require("./db");

function createServer() {
  return new GraphQLServer({
    schema: "src/schema.graphql",
    resolvers: { mutation, query },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
