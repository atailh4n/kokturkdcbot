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
  const req = await GuildModel.findOne({ discordID: message.guild.id})
  let dil = await UserModel.findOne({ discordID: message.author.id })

  if (dil.lang == false) {
    if (!req.announceChannel) return message.channel.send(Embed("err2_en"))
      let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(Embed("warn1_en", `${main.displaythings.prefix}slannounce <Mesaj>`))
      message.delete();
      const only = new Discord.MessageEmbed()
       .setTitle(message.author.username + " Shared a New Announce.")
    
      .setColor("RANDOM")
       .setAuthor("A new announce!")
      .setDescription(`${mesaj}`)
       .setThumbnail(message.guild.iconURL())
      .setFooter(`${ayarlar.displaythings.botname} | Announce System`)
       client.channels.cache.get(req.announceChannel).send(only);

    } else {

        let mesaj = args.slice(0).join(' ');
      if (mesaj.length < 1) return message.channel.send(Embed("warn1", `${main.displaythings.prefix}sessiz-duyuru <Mesaj>`))
        message.delete();
        const only = new Discord.MessageEmbed()
         .setTitle(message.author.username + " Yeni Bir Duyuru Paylaştı.")
      
        .setColor("RANDOM")
         .setAuthor("Yeni Bir Duyuru Bulunmakta!")
        .setDescription(`${mesaj}`)
         .setThumbnail(message.guild.iconURL())
        .setFooter(`${ayarlar.displaythings.botname} | Duyuru Sistemi`)
        client.channels.cache.get(req.announceChannel).send(only);

    }
  
};

exports.diger = {
    aliases: ['slannounce'], 
    requiredPermissions: [`MANAGE_MESSAGES`],
    requiredPermissionsMe: [`ADMINISTRATOR`],
    filterServerOwner: false,
    runInDM: false,
    cooldown: 'orta'
  };

exports.temel = {
    name: `sessiz-duyuru`,
    categoryen: `Server`,
    categorytr: `Sunucu`,
    descriptionen: `Announce something (without everyone tag)`,
    descriptiontr: `Duyuru yapın (everyone etiketi olmadan)`,
    usageen: `slannounce <Message>`,
    usagetr: `sessiz-duyuru <Mesaj>`
  };