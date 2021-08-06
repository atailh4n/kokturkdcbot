//Modules
const Discord = require('discord.js')
//External
const main = require('../other/Main_Info.js')
exports.run = async(client, message, args) => {
  
    if (message.author.id !== main.sahip) return;
    message.guild.owner.send(`\`${message.guild.name}\` sunucusundan sahibimin emri ile ayrıldım!`)
    message.guild.leave()

}

exports.diger = {
  aliases: [], 
  requiredPermissions: [],
  requiredPermissionsMe: [],
  filterServerOwner: false,
  runInDM: false,
  cooldown: 'hiç'
  };

exports.temel = {
    name: 'ayrıl'
  };