//Modules
const Discord = require('discord.js')
exports.run = async (client, message, args, color, prefix) => {
 if(message.author.id != config.sahipler.some) return;
 if (message.channel.id != config.datasowner.ownerevalchannel) return;
 try {
 let codein = args.join(" ");
 let code = eval(codein);
 if (codein.length < 1) return message.reply(`Missing argument!`)
 
 if (typeof code !== 'string')
 code = require('util').inspect(code, { depth: 0 });
 let embed = new Discord.MessageEmbed()
 .setColor('WHITE')
 .addField('Code', `\`\`\`js\n${codein}\`\`\``)
 .addField('Result:', `\`\`\`js\n${code}\n\`\`\``)
 message.channel.send(embed)
 } catch(e) {
 let embed2 = new Discord.MessageEmbed()
 .setColor('RED')
 .addField('Err', "\`\`\`js\n"+e+"\n\`\`\`")
 message.channel.send(embed2);
 }
}

exports.diger = {
    aliases: ['eval', 'command', 'chvl'], 
    requiredPermissions: [],
    requiredPermissionsMe: [],
    filterServerOwner: false,
    runInDM: true,
    cooldown: null
  };

exports.temel = {
    name: 'cmd',
    categoryen: 'Owner',
    categorytr: "Sahip",
    descriptionen: "Only can use owner",
    descriptiontr: "Sadece sahip kullanabilir",
    usageen: "cmd <Code>",
    usagetr: "cmd <Kod>"
  };