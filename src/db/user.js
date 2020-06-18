const User = require('../models/user');
const bcrypt = require('bcrypt');

function getUsers(res) {
    try {
        User.find(function (err, users) {
            if (err) {
                return res.status(404).send({ message: 'El usuario no existe!' });
            } else {
                return res.json(users);
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

function login(email, password, res) {
    try {
        User.findOne({ "email": email}, function (err, user) {
            if (user != undefined) {
                bcrypt.compare(password, user.password, function(err, match) {
                    if (match) {
                        return res.json({success: true, user: user});
                    } else {
                      return res.json({success: false, message: 'La contraseña es incorrecta.'});
                    }
                  });
            } else if (err) {
                return res.status(404).send({ message: 'El usuario no existe!' });
            } else {
                return res.status(404).send({ message: 'Email o contraseña incorrecta.' });
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
                        req.body.password = encrypted
                        const user = new User(req.body);
                        user.save(function(err, us) {
                            if (err) {
                                return res.status(404).json({ message: 'Ups! Ocurrió un error al crear el usuario.' });
                            } else {
                                return res.json({success: true, user: user});
                            }
                        });
                    } else {
                        return res.status(404).send({ message: 'Error encrypting password.' });
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
