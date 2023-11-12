const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Implement authentication logic if needed
    // Example: check the request headers for authentication token
    const token = req.headers.authorization || '';
    // Add any other context data you need

    return { user: decodeToken(token) }; // Implement decodeToken function
  },
});

// Apply Apollo middleware to Express
server.applyMiddleware({ app });

app.use(routes);

db.once('open', () => {
  console.log('Connected to the database.');

  // Start Apollo Server and Express
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`GraphQL Playground at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
