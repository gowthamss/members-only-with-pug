const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 20
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    status: {
        type: Boolean,
    }
})

module.exports = mongoose.model('User', UserSchema);