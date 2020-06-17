const express = require('express');
const router = express.Router();
const userDb = require('../db/user');

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    if (id) {
        userDb.getUser(id, res);
    } else {
        res.status(400).send({ message: 'Param ID is required' });
    }
});

router.get('/users', async res => {
    userDb.getUsers(res);
});

router.get('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        userDb.login(email, password, res)
    } else {
        res.status(400).send({ message: 'Param email and password is required' });
    }
})

router.post('/register', function (req, res) {
  const email = req.body.email;
  if (email) {
    userDb.register(req, res)
    } else {
        res.status(400).send({ message: 'Param email is required' });
    }
});

module.exports = router;
