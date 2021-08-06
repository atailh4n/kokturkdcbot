const { message } = require("discord.js");
const { Schema, model } = require("mongoose");
const { type } = require("os");

const User = Schema ({
    discordID: {
        type: String,
        required: true,
        unique: true
    },
    karaliste: {
        default: false,
        type: Boolean
    },
    lang: {
        default: false,
        type: Boolean
    },
    cooldown: {
        type: String,
        default: null
    },
})

module.exports = model('User', User)