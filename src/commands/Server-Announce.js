//Modules
const Discord = require('discord.js')
//Models
const UserModel = require('../models/UserModel.js')
const GuildModel = require('../models/GuildModel.js')
//External
const main = require('../other/Main_Info.js')
const Embed = require('../other/Embed_UI.js')
exports.run = async(client, message, args) => {

    const req = await GuildModel.findOne({ discordID: message.guild.id})
    const req_user = await UserModel.findOne({ discordID : message.author.id })
    if (req_user.lang == false) {
if (!req.annchannel) return message.reply(Embed("err1_en"));
if (req.annchannel)
      var mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.send(Embed("warn1", `${main.displaythings.prefix}announce <Message>`))
      message.delete();
      const only = new Discord.MessageEmbed()
       .setTitle(message.author.username + " Shared a New Announce.")
    
      .setColor("RANDOM")
       .setAuthor("A new announce!")
      .setDescription(`${mesaj}` + " @everyone @here")
       .setThumbnail(message.guild.iconURL())
      .setFooter(`${main.displaythings.botname} | Announce System`)
       client.channels.cache.get(req.annchannel).send(only)
    
      function afterever() {
        client.channels.cache.get(req.annchannel).send("🎉 @everyone @here Announce!") 
      }
      setTimeout(afterever, 3000);

    } else {

      const req = await UserModel.findOne({ discordID : message.author.id })
  if (!req.annchannel) return message.channel.send(Embed("err1"));
  if (req.annchannel)
        var mesaj = args.slice(0).join(' ');
      if (mesaj.length < 1) return message.channel.send(Embed("warn1", `${main.displaythings.prefix}announce <Message>`))
        message.delete();
        const only = new Discord.MessageEmbed()
         .setTitle(message.author.username + " Shared a New Announce.")
      
        .setColor("RANDOM")
         .setAuthor("A new announce!")
        .setDescription(`${mesaj}` + " @everyone @here")
         .setThumbnail(message.guild.iconURL())
        .setFooter(`${main.displaythings.botname} | Announce System`)
         client.channels.cache.get(req.annchannel).send(only)
      
        function afterever() {
          client.channels.cache.get(req.annchannel).send("🎉 @everyone @here Announce!") 
        }
        setTimeout(afterever, 3000);


    }
  
};

exports.diger = {
    aliases: ['announce'], 
    requiredPermissions: [`MANAGE_MESSAGES`],
    requiredPermissionsMe: [`ADMINISTRATOR`],
    filterServerOwner: false,
    runInDM: false,
    cooldown: 'orta'
  };

exports.temel = {
    name: `duyuru`,
    categoryen: `Server`,
    categorytr: `Sunucu`,
    descriptionen: `Announce something (with everyone tag)`,
    descriptiontr: `Duyuru yapın (everyone etiketi ile)`,
    usageen: `announce <Message>`,
    usagetr: `duyuru <Mesaj>`
  };