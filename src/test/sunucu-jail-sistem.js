const Discord = require("discord.js")
const db = require('quick.db');
const config = require('../config.js');
const Embed = require('../ui/embed.js');

 exports.run = async (client, message, args) => {

    const dil = db.get(`sunucu.${message.guild.id}.language`)

    if (dil == true) {

        let yetkisiz = new Discord.MessageEmbed() 
        .setDescription('Bu Komutu Kullanabilmek için **Yönetici** Yetkin Olmalı!')
        .setColor('RED') 
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(yetkisiz) 
        
      const prefix = config.displaythings.prefix
      
      if(!args[0]) return message.channel.send(Embed("general", "Zyron | Hapis Sistemi", `Jail Rolünü Ayarlamak için \`${prefix}jailayar rol\`\nJail Yetkilisini Rolünü Ayarlamak için \`${prefix}jailayar yetkili\`\nJail Log Kanalını Ayarlamak için \`${prefix}jailayar log\``))
      
      
      if(args[0] === 'rol' || args[0] === 'ROL') {
      
      let rol = message.mentions.roles.first() || message.guild.roles.cache.find(c => c.name === args[1].join(' ')) || message.guild.roles.cache.get(args[1]);
      if(!rol) return message.channel.send(Embed("error", "ERRCD: 0002 | Veritabanı Hatası", "Böyle bir isime veya ID'ye sahip bir rol bulunmamaktadır"))
      
      db.set(`sunucu.${message.guild.id}.jailrol`, rol.id);
      await message.channel.send(Embed("info", "Başarılı", `Jail rolü <@&${rol.id}> olarak ayarlandı.`))
      }
      
      if(args[0] === 'yetkili' || args[0] === 'yetkilirol' || args[0] === 'yetkili-rol') {
      
        let yetkilirol = message.mentions.roles.first() || message.guild.roles.cache.find(c => c.name === args[1].join(' ')) || message.guild.roles.cache.get(args[1]);
        if(!yetkilirol) return message.channel.send('💥 Jail Yetkilisi Rolü Yapmak istediğin Rolü Belirt veya İsmini/ID\'sini Belirt!')
        
        db.set(`jailyetkili.${message.guild.id}`, yetkilirol.id);
        
        const matsucode1 = new Discord.MessageEmbed()
        .setColor('GOLD')
        .setAuthor(message.author.username,message.author.avatarURL({ dynamic:true } ? message.author.avatarURL({ dynamic:true }): client.user.avatarURL()))
        .setTitle('⭐Jail Sistemi')
        .setDescription(`✅ Başarılı! Jail Yetkilisi Rolü <@&${yetkilirol.id}> Olarak Ayarlandı!`)
        await message.channel.send(matsucode1)
        }
        
      if(args[0] === 'log' || args[0] === 'kanal') {
      
        let kanal = message.mentions.channels.first() || message.guild.channel.cache.find(c => c.name === args[1].join(' ')) || message.guild.channels.cache.get(args[1]);
        if(!kanal) return message.channel.send('💥 Jail Log Kanalı Yapmak istediğin kanalı belirt veya İsmini/ID\'sini Belirt!')
        
        db.set(`jailkanal.${message.guild.id}`, kanal.id);
        
        const matsucode2 = new Discord.MessageEmbed()
        .setColor('GOLD')
        .setAuthor(message.author.username,message.author.avatarURL({ dynamic:true } ? message.author.avatarURL({ dynamic:true }): client.user.avatarURL()))
        .setTitle('⭐Jail Sistemi')
        .setDescription(`✅ Başarılı! Jail Log Kanalı <#${kanal.id}> Olarak Ayarlandı!`)
        await message.channel.send(matsucode2)
        }

    } else {

        let yetkisiz = new Discord.MessageEmbed() 
        .setDescription('Bu Komutu Kullanabilmek için **Yönetici** Yetkin Olmalı!')
        .setColor('RED') 
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(yetkisiz) 
        
      const prefix = config.displaythings.prefix
      
      if(!args[0]) return message.channel.send(Embed("general", "Zyron | Hapis Sistemi", `Jail Rolünü Ayarlamak için \`${prefix}jailayar rol\`\nJail Yetkilisini Rolünü Ayarlamak için \`${prefix}jailayar yetkili\`\nJail Log Kanalını Ayarlamak için \`${prefix}jailayar log\``))
      
      
      if(args[0] === 'rol' || args[0] === 'ROL') {
      
      let rol = message.mentions.roles.first() || message.guild.roles.cache.find(c => c.name === args[1].join(' ')) || message.guild.roles.cache.get(args[1]);
      if(!rol) return message.channel.send(Embed("error", "ERRCD: 0002 | Veritabanı Hatası", ""))
      
      db.set(`sunucu.${message.guild.id}.jailrol`, rol.id);
      
      const matsucode = new Discord.MessageEmbed()
      .setColor('GOLD')
      .setAuthor(message.author.username,message.author.avatarURL({ dynamic:true } ? message.author.avatarURL({ dynamic:true }): client.user.avatarURL()))
      .setTitle('⭐Jail Sistemi')
      .setDescription(`✅ Başarılı! Jail Rolü <@&${rol.id}> Olarak Ayarlandı!`)
      await message.channel.send(matsucode)
      }
      
      if(args[0] === 'yetkili' || args[0] === 'yetkilirol' || args[0] === 'yetkili-rol') {
      
        let yetkilirol = message.mentions.roles.first() || message.guild.roles.cache.find(c => c.name === args[1].join(' ')) || message.guild.roles.cache.get(args[1]);
        if(!yetkilirol) return message.channel.send('💥 Jail Yetkilisi Rolü Yapmak istediğin Rolü Belirt veya İsmini/ID\'sini Belirt!')
        
        db.set(`jailyetkili.${message.guild.id}`, yetkilirol.id);
        
        const matsucode1 = new Discord.MessageEmbed()
        .setColor('GOLD')
        .setAuthor(message.author.username,message.author.avatarURL({ dynamic:true } ? message.author.avatarURL({ dynamic:true }): client.user.avatarURL()))
        .setTitle('⭐Jail Sistemi')
        .setDescription(`✅ Başarılı! Jail Yetkilisi Rolü <@&${yetkilirol.id}> Olarak Ayarlandı!`)
        await message.channel.send(matsucode1)
        }
        
      if(args[0] === 'log' || args[0] === 'kanal') {
      
        let kanal = message.mentions.channels.first() || message.guild.channel.cache.find(c => c.name === args[1].join(' ')) || message.guild.channels.cache.get(args[1]);
        if(!kanal) return message.channel.send('💥 Jail Log Kanalı Yapmak istediğin kanalı belirt veya İsmini/ID\'sini Belirt!')
        
        db.set(`jailkanal.${message.guild.id}`, kanal.id);
        
        const matsucode2 = new Discord.MessageEmbed()
        .setColor('GOLD')
        .setAuthor(message.author.username,message.author.avatarURL({ dynamic:true } ? message.author.avatarURL({ dynamic:true }): client.user.avatarURL()))
        .setTitle('⭐Jail Sistemi')
        .setDescription(`✅ Başarılı! Jail Log Kanalı <#${kanal.id}> Olarak Ayarlandı!`)
        await message.channel.send(matsucode2)
        }

    }
};

exports.diger = {
    aliases: ['jailsystem', 'jail-system', 'hapissistemi'], 

    filterServerOwner: false,
    runInDM: true,
    cooldown: '10 saniye'
  };

exports.temel = {
    name: 'hapis-sistemi',
    categoryen: 'Server',
    categorytr: "Sunucu",
    descriptionen: "Jail settings and more.",
    descriptiontr: "Hapis ayarları ve daha fazlası",
    usageen: "jail-system",
    usagetr: "hapis-sistemi"
  };