const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function getUsers(req, res) {
    try {
        User.find(function (err, users) {
            if (err) {
                return res.status(404).send({ message: 'El usuario no existe!' });
            } else {
                return res.send(users);
            }
        });
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
}

function getUser(id, res) {
    try {
        User.findById(id, function (err, user) {
            if (err) {
                return res.status(404).send({ message: 'El usuario no existe!' });
            } else {
                return res.json(user);
            }
        });
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

function login(email, password, req, res) {
    try {
        User.findOne({ "email": email}, function (err, user) {
            if (user != undefined) {
                bcrypt.compare(password, user.password, function(err, match) {
                    if (match) {
                        const payload = { username: user.username };
                        const token = jwt.sign(payload, req.app.get('key'), { expiresIn: 60 * 60 * 24 });
                        const us = {
                            id: user.id,
                            email: user.email,
                        }
                        res.json({success: true, user: us, token: token});
                    } else {
                      return res.json({success: false, message: 'La contraseña es incorrecta.'});
                    }
                  });
            } else if (err) {
                return res.status(200).send({ message: 'El usuario no existe!' });
            } else {
                return res.status(200).send({ message: 'Email o contraseña incorrecta.' });
            }
        });
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
}

function register (req, res) {
    try {
        User.find({ "email": req.body.email}, function (err, user) {
            if (user.length > 0) {
                return res.status(404).send({ message: 'El email ya esta regsitrado.' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                    if (!err) {
                        req.body.password = encrypted;
                        const user = new User(req.body);
                        const payload = { username: user.username };
                        const token = jwt.sign(payload, req.app.get('key'), { expiresIn: 60 * 60 * 24 });
                        user.save(function(err, user) {
                            if (err) {
                                return res.status(404).json({ message: 'Ups! Ocurrió un error al crear el usuario.' });
                            } else {
                                return res.json({success: true, user: user, token: token});
                            }
                        });
                    } else {
                        return res.status(404).send({ message: 'Error al encriptar el password.' });
                    }

                })
            }
        });
   } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    getUser,
    login,
    register,
};
