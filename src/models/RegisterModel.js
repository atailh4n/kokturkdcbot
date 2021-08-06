const { Schema, model } = require('mongoose');

const Register = new Schema({
    guildID: {
        type: String,
        required: true,
        unique: true
    },
    adminRole: {
        default: null,
        type: String,
        required: true,
        unique: true
    },
    newbieRole: {
        default: null,
        type: String,
        required: true,
        unique: true
    },
    welcomeChannel: {
        default: null,
        type: String,
        required: true,
        unique: true
    },
    registerRole: {
        default: null,
        type: String,
        required: true,
        unique: true
    },
    registerRole_two: {
        default: null,
        type: String,
        unique: true
    }
})

module.exports = model('Register', Register)