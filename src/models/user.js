const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id: String,
    username: { type: String, required: true },
    full_name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_picture: String,
    country: String,
    bio: String,
    media: Number,
    follows: Number,
    followed_by: Number
});

module.exports = mongoose.model('users', User);
