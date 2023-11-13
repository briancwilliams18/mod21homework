const { gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs'); // Adjust the path accordingly
const resolvers = require('./resolvers'); // Adjust the path accordingly


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { user: decodeToken(token) };
  },
});

server.applyMiddleware({ app });