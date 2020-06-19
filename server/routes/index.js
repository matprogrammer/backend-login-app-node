const express = require('express');
const router = express.Router();
const userDb = require('../db/user');
const middleware = require('../middleware/middleware');

router.get('/user/:id', middleware, (req, res) => {
    const { id } = req.params;
    if (id) {
        userDb.getUser(id, res);
    } else {
        res.status(400).send({ message: 'Param ID is required' });
    }
});

router.get('/',function(req,res){
    res.render('index');
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
