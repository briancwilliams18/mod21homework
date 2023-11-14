// auth.js
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = (context) => {
  let token = context.req.headers.authorization || '';

  if (context.req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    throw new AuthenticationError('You have no token!');
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    context.user = data; // This is the authenticated user data
  } catch {
    console.log('Invalid token');
    throw new AuthenticationError('Invalid token!');
  }

  return context;
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };

