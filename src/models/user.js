const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    photo: String,
    age: String,
    country: String,
    description: String
});

module.exports = mongoose.model('users', User);
