//Modules
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('tr')
require('moment-duration-format')
const { model, Schema, mongoose } = require('mongoose')
const fetch = require('node-fetch')
const ms = require('ms')
const os = require('os')
//Models
const UserModel = require('../models/UserModel.js')
const GuildModel = require('../models/GuildModel.js')
const RegisterModel = require('../models/RegisterModel.js')
//External
const main = require('../other/Main_Info.js')
const Embed = require('../other/Embed_UI.js')
exports.run = async(client, message, args) => {

    const dil = UserModel.findOne( { discordID: message.author.id } )

    if (dil.lang === true) {

    } else {
        if (args[0] == "duyuru-kanal") {
          if (!args[1]) return message.channel.send(embed("warn", "WARNCD: 0001 | Kayıp Argüman", "lütfen bir argüman girin."))
          const req = await GuildModel.findOneAndUpdate( { id: message.guild.id }, { $set: { annchannel: args[1] } }, { new: true } ); 
          message.channel.send(embed("general", "Başarılı", `Başarı ile döküman ayarlandı. ${req.annchannel}`))
        }
        if (args[0] == "dil") {
            let secenek = [
                "EN",
                "TR"
            ]
            if (!args[1] || args[1] == secenek.some) return message.channel.send(embed("warn", "WARNCD: 0001 | Missing Argument", `Kayıp argüman. Örnek: \`${config.displaythings.prefix}ayarla dil <EN/TR>\``))
            if (args[1] == "EN") {
            const req = GuildModel.findOneAndUpdate( { id: message.guild.id }, { $set: { lang: true } }, { new: true } )
            message.channel.send(embed("success", "Başarılı", `Başarı ile dil ayarlandı: ${req.lang}`))
            }
        }
    };


};

exports.diger = {
    aliases: [],
    requiredPermissions: [`ADMINISTRATOR`],
    requiredPermissionsMe: [`ADMINISTRATOR`],
    filterServerOwner: true,
    runInDM: false,
    cooldown: 'temel'

}

exports.temel = {
    name: `ayarla`,
    nameen: `set`,
    categoryen: `Server`,
    categorytr: `Sunucu`,
    descriptionen: `Set a value`,
    descriptiontr: `Bir değer ayarlayın`,
    usageen: `set <Value> <Key>`,
    usagetr: `ayarla <Değer> <Anahtar>`
}