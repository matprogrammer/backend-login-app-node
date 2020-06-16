const express = require('express');
const router = express.Router();

const User = require('../models/users');

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
});

router.get('/users', async (req, res) => {
    const user = await User.find();
    res.send(user);
});

module.exports = router;
