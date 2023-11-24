const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, minlength: 6, required: true },
    role: {
        type: String,
        enum: ['reader', 'author'],
        default: 'reader',
      },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
