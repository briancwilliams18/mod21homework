const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
  }

  type Auth {
    token: String!
    user: User
  }

  input BookInput {
    title: String!
    author: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
  }
`;

module.exports = typeDefs;
