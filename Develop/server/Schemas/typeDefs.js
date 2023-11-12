const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    // Add any other user fields as needed
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
    // Add any other book fields as needed
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
    // Add any other queries you need
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

  input BookInput {
    title: String!
    author: String!
    // Add any other fields required for saving a book
  }
`;

module.exports = typeDefs;