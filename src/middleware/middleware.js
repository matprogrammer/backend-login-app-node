const express = require('express');
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

module.exports = middleware;
