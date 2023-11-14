// schemas/index.js
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

// Load type definitions using the file loader
const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));

// Merge type definitions
const typeDefs = mergeTypeDefs(typesArray);

// Load resolvers using the file loader
const resolversArray = loadFilesSync(path.join(__dirname, './**/*.js'));

// Merge resolvers
const resolvers = mergeResolvers(resolversArray);

module.exports = { typeDefs, resolvers };
