const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require("express-session");

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: "monster", // default is sid but dont use that.
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes
    secure: false, // only send the cookie for https, should be true in production!!!
    httpOnly: true, // js cant access this. false means JS can access the cookie
  },
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request. Default is true.
    saveUninitialized: false, // docs have this as true. Forces a session that is "uninitialized" to be saved to the store. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie.
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
