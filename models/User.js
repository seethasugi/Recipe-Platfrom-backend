const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    googleId: String,
    Picture: String,
    token: String,
    VerifiedEmail: Boolean
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
