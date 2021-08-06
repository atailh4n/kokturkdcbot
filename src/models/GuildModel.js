const { guild } = require('discord.js');
const { Schema, model } = require('mongoose');

const Guild = Schema({
    discordID: {
        type: String,
        required: true,
        unique: true
    },
    guildLang: {
        default: false,
        type: Boolean
    },
    announceChannel: {
        default: null,
        type: String
    },
    boosterRole: {
        default: null,
        type: String
    },
    jailRole: {
        default: null,
        type: String
    },
    trustRole: {
        default: null,
        type: String
    },
    otherIDs_mod: {
        type: Array
    },
    modLogChannel: {
        default: null,
        type: String
    },
    channelProtection: {
        default: false,
        type: Boolean
    },
    botProtection: {
        default: false,
        type: Boolean
    },
    banProtection: {
        default: false,
        type: Boolean
    },
    kickProtection: {
        default: false,
        type: Boolean
    },
    serverProtection: {
        default: false,
        type: Boolean
    },
    rightClickProtection: {
        default: false,
        type: Boolean
    },
    roleProtection: {
        default: false,
        type: Boolean
    }
})


module.exports = model('Guild', Guild);