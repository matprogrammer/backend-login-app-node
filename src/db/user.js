const User = require('../models/user');
const bcrypt = require('bcrypt');

function getUsers(res) {
    try {
        User.find(function (err, users) {
            if (err) {
                res.status(404).send({ message: 'User not exists' });
            } else {
                res.json(users);
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
                res.status(404).send({ message: 'User not exists' });
            } else {
                res.json(user);
            }
        });
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
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
                      return res.json({success: false, message: 'passwords do not match'});
                    }
                  });
            } else if (err) {
                res.status(404).send({ message: 'User not exists' });
            } else {
                res.status(404).send({ message: 'User or password incorrect' });
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
                res.status(404).send({ message: 'Email in use' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                    if (!err) {
                        req.body.password = encrypted
                        const user = new User(req.body);
                        user.save(function(err, us) {
                            if (err) return console.error(err);
                            console.log("User registered succussfully!" + us.name);
                        });
                    } else {
                        res.status(404).send({ message: 'Error encrypting password' });
                    }

                })
            }
        });
   } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    getUser,
    login,
    register,
};
