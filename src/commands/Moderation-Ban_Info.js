//Modules
const Discord = require('discord.js')
//Models
const UserModel = require('../models/UserModel.js')
//External
const Embed = require('../other/Embed_UI.js')
exports.run = async (client, message, args) => {

  let dil = await UserModel.findOne({ discordID: message.author.id })

  if (dil.lang == false) {

    if(!args[0] || isNaN(args[0])) return message.channel.send(Embed("warn1_en", `${ayarlar.displaythings.prefix}ban-info <ID>`));
    try {
      message.guild.fetchBan(args.slice(0).join(' '))
      .then(({ user, reason }) => message.channel.send(Embed("success", "Founded a match on Discord Database", `> **Banned user:** ${user.tag} \`(${user.id})\`\n **Reason:** ${reason}`)))
    } catch(err) { 
      message.channel.send(Embed("err1_en"))
    }

  } else {

    if(!args[0] || isNaN(args[0])) return message.channel.send(Embed("warn1_en", `${ayarlar.displaythings.prefix}ban-info <ID>`));
    try {
      message.guild.fetchBan(args.slice(0).join(' '))
      .then(({ user, reason }) => message.channel.send(Embed("success", "Discord Veritabanında bir eşleşme bulundu", `> **Ban cezası alan kişi:** ${user.tag} \`(${user.id})\`\n> **Sebep:** ${reason}`)))
    } catch(err) { 
      message.channel.send(Embed("err1"))
      console.log(err)
    }

  }
};

exports.diger = {
    aliases: [`ban-info`], 
    requiredPermissions: [`BAN_MEMBERS`],
    requiredPermissionsMe: [`ADMINISTRATOR`],
    filterServerOwner: false,
    runInDM: false,
    cooldown: 'kısa'
  };

exports.temel = {
    name: `ban-bilgi`,
    nameen: `ban-info`,
    categoryen: `Moderation`,
    categorytr: `Moderasyon`,
    descriptionen: `Get ban info`,
    descriptiontr: `Birini banlamanızı sağlar`,
    usageen: `ban-info <User ID>`,
    usagetr: `ban-bilgi <Kullanıcı ID>`
  };