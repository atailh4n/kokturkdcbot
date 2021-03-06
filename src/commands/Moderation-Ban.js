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
  
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send(Embed("error", "ERRCD: 0001 | ??zin Hatas??", "Bu kullan??c?? banlanamaz. ????nk?? Zyron'un `BAN_MEMBERS` izni bulunmamakta."));
  
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(Embed("error", "ERRCD: 0001 | ??zin Hatas??", "Bu komut kullan??lamaz. Bu komutu kullanabilmek i??in `BAN_MEMBERS` izninine ihtiyac??n??z var."));
  
   
  
    var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  
    if(!kisi) return message.channel.send(Embed("warn1", `${main.displaythings.prefix}ban ID/@Kullan??c??/Kullan??c?? Ad??`))
  
   var sebeb = args.slice(1).join(" ");
  
      if(message.author == kisi) return message.channel.send(Embed("err2", `${main.displaythings.botname}ban ID/@Kullan??c??/Kullan??c?? Ad?? <sebep>`))
  
      if (banxx.get(kisi.id)) return message.channel.send(Embed("err1"))
  
   var now = new Date()
  
   if (!sebeb) {
  
           try {
  
            kisi.send(Embed("warn", `${guild} Adl?? Sunucudan Banland??n??z.`, `**Kal??c?? olarak**, ${guild} adl?? sunucudan banland??n??z.\n\n> **Sebep:** *Sebep girilmedi.*`))
  
            message.channel.send(Embed("success", "Ki??i Ba??ar?? ??le Banland??.", `${kisi} adl?? ki??i ${guild} adl?? sunucudan banland??.\n\n> **Sebep:** *Sebep girilmedi.*`))
  
            guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
  
          } catch (error) {
  
              
  
            message.channel.send(Embed("error", "ERRCD: ???? | Bilinmeyen Hata", "Bilinmeyen Hata. Geli??tirici ile ileti??ime ge??in."))
  
            console.log(error)
  
          }
  
   } else {
  
   try {
  
    kisi.send(Embed("warn", `${guild} Adl?? Sunucudan Banland??n??z.`, `**Kal??c?? olarak**, ${guild} adl?? sunucudan banland??n??z.\n\n> **Sebep:** *${sebeb}*`))
  
    message.channel.send(Embed("success", "Ki??i Ba??ar?? ??le Banland??.", `${kisi} adl?? ki??i ${guild} adl?? sunucudan banland??.\n\n> **Sebep:** *${sebeb}*`))
  
     guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
  
   } catch (error) {
       
  
    message.channel.send(Embed("error", "ERRCD: ???? | Bilinmeyen Hata", "Bilinmeyen Hata. Geli??tirici ile ileti??ime ge??in."))
  
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
    cooldown: 'k??sa'
  };

exports.temel = {
    name: `ban`,
    nameen: `ban`,
    categoryen: `Moderation`,
    categorytr: `Moderasyon`,
    descriptionen: `Ban someone`,
    descriptiontr: `Birini banlay??n`,
    usageen: `ban <User> {Reason}`,
    usagetr: `ban <User> {Reason}`
  };