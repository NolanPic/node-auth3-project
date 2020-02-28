const express = require('express');
const authRouter = require('./auth/router');
const usersRouter = require('./users/router');

const server = express();

server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
