//Modules
const Discord = require('discord.js')
//Models
const UserModel = require('../models/UserModel.js')
//External
const Embed = require('../other/Embed_UI.js')
exports.run = async(client, message, args) => {

  let dil = await UserModel.findOne({ discordID: message.author.id })

  if (dil.lang == false) {

    var guild = message.guild;
    var banlayan = message.author.tag;
  
    let banxx = await message.guild.fetchBans();
  
    var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  
    if(!kisi) return message.channel.send(Embed("warn1_en", `\`${main.displaythings.prefix}ban ID/@User/Username\``))
  
   var sebeb = args.slice(1).join(" ");
  
      if(message.author == kisi) return message.channel.send(Embed("err2_en", `${main.displaythings.prefix}ban ID/@User/Username <reason>`))
  
      if (banxx.get(kisi.id)) return message.channel.send(Embed("err1_en"))
  
   var now = new Date()
  
   if (!sebeb) {
  
           try {
  
            kisi.send(Embed("warn", `You are banned from ${guild}`, `You are **permanently** banned from ${guild}\n\n> **Reason:** *Reason not entered.*`)).catch(err)
  
            message.channel.send(Embed("success", "This user sucsessfuly banned.", `Person named ${kisi} banned from ${guild} server.\n\n> **Reason:** *Reason not entered.*`))
  
            guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
  
          } catch (error) {
  
              
  
            message.channel.send(Embed("error", "ERRCD: ???? | Unkown Error", "Unknown error. Contact the developer."))
  
            console.log(error)
  
          }
  
   } else {
  
   try {
  
    kisi.send(Embed("warn", `You are banned from ${guild}`, `You are **permanently** banned from ${guild}\n\n> **Reason:** *${reason}*`))
  
    message.channel.send(Embed("info", "This user sucsessfuly banned.", `Person named ${kisi} banned from ${guild} server.\n\n> **Reason:** *${reason}*`))
  
     guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
  
   } catch (error) {
       
  
    message.channel.send(Embed("error", "ERRCD: ???? | Unkown Error", "Unknown error. Contact the developer."))
  
     console.log(error)
  
   }
   }

  } else {

    var guild = message.guild;
    var banlayan = message.author.tag;
  
    let banxx = await message.guild.fetchBans();
  
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send(Embed("error", "ERRCD: 0001 | İzin Hatası", "Bu kullanıcı banlanamaz. Çünkü Zyron'un `BAN_MEMBERS` izni bulunmamakta."));
  
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(Embed("error", "ERRCD: 0001 | İzin Hatası", "Bu komut kullanılamaz. Bu komutu kullanabilmek için `BAN_MEMBERS` izninine ihtiyacınız var."));
  
   
  
    var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  
    if(!kisi) return message.channel.send(Embed("warn1", `${main.displaythings.prefix}ban ID/@Kullanıcı/Kullanıcı Adı`))
  
   var sebeb = args.slice(1).join(" ");
  
      if(message.author == kisi) return message.channel.send(Embed("err2", `${main.displaythings.botname}ban ID/@Kullanıcı/Kullanıcı Adı <sebep>`))
  
      if (banxx.get(kisi.id)) return message.channel.send(Embed("err1"))
  
   var now = new Date()
  
   if (!sebeb) {
  
           try {
  
            kisi.send(Embed("warn", `${guild} Adlı Sunucudan Banlandınız.`, `**Kalıcı olarak**, ${guild} adlı sunucudan banlandınız.\n\n> **Sebep:** *Sebep girilmedi.*`))
  
            message.channel.send(Embed("success", "Kişi Başarı İle Banlandı.", `${kisi} adlı kişi ${guild} adlı sunucudan banlandı.\n\n> **Sebep:** *Sebep girilmedi.*`))
  
            guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
  
          } catch (error) {
  
              
  
            message.channel.send(Embed("error", "ERRCD: ???? | Bilinmeyen Hata", "Bilinmeyen Hata. Geliştirici ile iletişime geçin."))
  
            console.log(error)
  
          }
  
   } else {
  
   try {
  
    kisi.send(Embed("warn", `${guild} Adlı Sunucudan Banlandınız.`, `**Kalıcı olarak**, ${guild} adlı sunucudan banlandınız.\n\n> **Sebep:** *${sebeb}*`))
  
    message.channel.send(Embed("success", "Kişi Başarı İle Banlandı.", `${kisi} adlı kişi ${guild} adlı sunucudan banlandı.\n\n> **Sebep:** *${sebeb}*`))
  
     guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
  
   } catch (error) {
       
  
    message.channel.send(Embed("error", "ERRCD: ???? | Bilinmeyen Hata", "Bilinmeyen Hata. Geliştirici ile iletişime geçin."))
  
     console.log(error)
  
   }
   }

  }
};

exports.diger = {
    aliases: [], 
    requiredPermissions: [`BAN_MEMBERS`],
    requiredPermissionsMe: [`ADMINISTRATOR`],
    filterServerOwner: false,
    runInDM: false,
    cooldown: 'kısa'
  };

exports.temel = {
    name: `ban`,
    nameen: `ban`,
    categoryen: `Moderation`,
    categorytr: `Moderasyon`,
    descriptionen: `Ban someone`,
    descriptiontr: `Birini banlayın`,
    usageen: `ban <User> {Reason}`,
    usagetr: `ban <User> {Reason}`
  };