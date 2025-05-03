const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    }]
});

module.exports = mongoose.model('user', userSchema);
