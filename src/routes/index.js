const express = require('express');
const router = express.Router();
const userDb = require('../db/user');
const middleware = express.Router();
const jwt = require('jsonwebtoken');

middleware.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, req.app.get('key'), (err, decoded) => {
        if (err) {
          res.send({ mensaje: 'Token inválida' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({
          mensaje: 'Token no proveída.'
      });
    }
 });

router.get('/user/:id', middleware, (req, res) => {
    const { id } = req.params;
    if (id) {
        userDb.getUser(id, res);
    } else {
        res.status(400).send({ message: 'Param ID is required' });
    }
});

router.get('/users/', middleware, (req, res) => {
    userDb.getUsers(req, res);
});

router.get('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email != "" && password != "") {
        userDb.login(email, password, req, res);
    } else {
        res.status(400).send({ message: 'Param email and password is required' });
    }
})

router.post('/register', function (req, res) {
  const email = req.body.email;
  if (email != "") {
        userDb.register(req, res);
    } else {
        res.status(400).send({ message: 'Param email is required' });
    }
});

module.exports = router;
