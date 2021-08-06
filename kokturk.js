//Modules
const Discord = require('discord.js')
const moment = require('moment')
const CaprihamTheme = require('dbd-capriham-theme')
moment.locale('tr')
require('moment-duration-format')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const ms = require('ms')
const os = require('os')
const DBD = require('discord-dashboard');
//Models
const UserModel = require('./src/models/UserModel.js')
const GuildModel = require('./src/models/GuildModel.js')
const RegisterModel = require('./src/models/RegisterModel.js')
//External
const main = require('./src/other/Main_Info.js')
const Embed = require('./src/other/Embed_UI.js')

mongoose.connect(main.mongolink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
mongoose.connection.on("open", async() => {
console.log("MongoDB connected.")
})
mongoose.connection.on('connected', function () {  
  console.log('MongoDB link: ' + main.mongolink);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
const fs = require('fs');
const { info } = require('console')

const client = new Discord.Client();

if(main.tokens.length <= 0) return console.error('Bir token bağlanmamış.');

for(var key in main.tokens) {
  client.login(main.tokens[key]).catch(() => {
    return;
  });

  client.commands = new Discord.Collection();
  client.on('ready', async () => {
    client.user.setPresence({ activity: { name: `${main.displaythings.prefix}help | ${main.displaythings.botwebsite}`, type: "STREAMING", url: "https://twitch.tv/v0rt3xtr" } });
    console.log(`${client.user.tag} ismine bağlandım.`);


    await fs.readdir('./src/commands/./', (err, files) => {
      if(err) return;
      
      for(const key in files) {
        if(files[key].split('.').pop() == 'js') { 
          var file = require(`./src/commands/./${files[key]}`);
          if(file.temel && file.temel.name) {
            console.log('[Köktürk File Handler v0.0.2] | '+file.temel.name+' adlı komut yüklendi.');
            client.commands.set(file.temel.name, file);
          };
        };
      };

    });
  });

  client.on('message', async message => {
    if(message.partial) message = await message.fetch();
    if(message.author.bot) return;
    
    var arguments;
    var commandName;
     const spaceReg = / +/g;
    
    if(main.prefixes.some(data => message.content.startsWith(data.prefix))) {

      const data = main.prefixes.find(data => message.content.startsWith(data.prefix));

      if(data.space === true) {
        arguments = message.content.split(spaceReg).slice(2);
        commandName = message.content.split(spaceReg)[1];
      } else {
        arguments = message.content.split(spaceReg).slice(1);
        commandName = message.content.split(spaceReg)[0].slice(data.prefix.length);
      };
      
    } else if(main.mentionPrefix) {
      
      if(message.mentions.users.size > 0) {
        if(message.mentions.users.first().id == client.user.id && (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`))) {
      
          arguments = message.content.split(spaceReg).slice(2);
          commandName = message.content.split(spaceReg)[1];
          message.mentions.members = message.mentions.members.map(x => x).slice(1);
          message.mentions.users = message.mentions.users.map(x => x).slice(1);
          
        };
      };
    };
    
    if(!client.commands.some(data => data.temel.name.toLowerCase() === commandName || data.diger.aliases.find(alias => alias.toLowerCase() === commandName))) return;
    const command = client.commands.find(data => data.temel.name.toLowerCase() === commandName || data.diger.aliases.find(alias => alias.toLowerCase() === commandName));

    if(!command.diger.runInDM && message.channel.type !== 'text') return;
    const mitEmbeden = new Discord.MessageEmbed()
    .setColor(main.displaythings.color_main)
    .setThumbnail(main.displaythings.botlogo)
    .setAuthor(`${main.displaythings.botname} | License`)
    .setTitle(`Please acknowledge that you comply with the "License Terms" to use the ${main.displaythings.botname} bot.`)
    .setDescription(`[Open Source GitHub](https://github.com/atailh4n/kokturkdcbot) | [Discord Guidelines](https://discord.com/guidelines)`)
    .addField(
      `${main.displaythings.botname} | Personal Purposes`,
      `> When using ${main.displaythings.botname} bot, I declare that I will only use it for personal purposes.`
    )
    .addField(
      `${main.displaythings.botname} | Open Source Code`,
      `> I will use this open source software (${main.displaythings.botname} bot) only for the stated purposes (Education, Learning, Review or just for fun etc.).`
    )
    .addField(
      `${main.displaythings.botname} | Data Storage and Processing`,
      `> I accept that my information(s) is stored in the ${main.displaythings.botname} bot database and I know that I have the right to delete it at any time and I can also contact the developer.`
    )
    .addField(
      `${main.displaythings.botname} | Legal and Criminal Actions`,
      `> I know that if I use ${main.displaythings.botname} bot for other than the above stated purpose(s), I will be subject to criminal and legal action and will be banned from using it forever.`
    )
    .addField(
      `${main.displaythings.botname} | Basic Rules and Discord Guidelines`,
      `> I agree to abide by the above ground rules, including Discord's own rules. I know that if I break two terms (${main.displaythings.botname} bot rules, Discord Guidelines), I will be subject to the 4th clause and Discord's own criminal actions.`
    )
    .setFooter(`${main.displaythings.botname} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix} | ${main.displaythings.botwebsite}`);

    const mitEmbedtr = new Discord.MessageEmbed()
    .setColor(main.displaythings.color_main)
    .setThumbnail(main.displaythings.botlogo)
    .setAuthor(`${main.displaythings.botname} | Lisans`)
    .setTitle(`${main.displaythings.botname} botunu kullanmak için lütfen **"Lisans Koşulları"**na uyduğunuzu kabul edin.`)
    .setDescription(`[Açık Kaynak GitHub](https://github.com/atailh4n/kokturkdcbot) | [Discord Kuralları](https://discord.com/guidelines)`)
    .addField(
      `${main.displaythings.botname} | Kişisel Amaçlar`,
      `> ${main.displaythings.botname} botunu kullanırken sadece kişisel amaçlarla kullanacağımı beyan ederim.`
    )
    .addField(
      `${main.displaythings.botname} | Açık Kaynak Kod`,
      `> Bu açık kaynaklı yazılımı (${main.displaythings.botname} bot) sadece belirtilen amaçlar için (Eğitim, Öğrenme, İnceleme veya sadece eğlence için vb.) kullanacağım.`
    )
    .addField(
      `${main.displaythings.botname} | Veri Depolama ve İşleme`,
      `> Bilgilerimin ${main.displaythings.botname} bot veritabanında saklandığını kabul ediyorum ve bunları herhangi bir zamanda silme hakkım olduğunu biliyorum ve geliştiriciyle de iletişime geçebileceğimi biliyorum.`
    )
    .addField(
      `${main.displaythings.botname} | Hukuki ve Cezai İşlemler`,
      `> ${main.displaythings.botname} botunu yukarıda belirtilen amaç(lar) dışında kullanırsam, cezai ve yasal işlemlere tabi tutulacağımı ve onu kullanmaktan sonsuza kadar men edileceğimi biliyorum.`
    )
    .addField(
      `${main.displaythings.botname} | Basit Kurallar ve Discord Kuralları`,
      `> Discord'un kendi kuralları da dahil olmak üzere yukarıdaki temel kurallara uymayı kabul ediyorum. İki terimi (${main.displaythings.botname} bot kuralları, Discord Yönergeleri) ihlal edersem, 4. maddeye ve Discord'un kendi cezai işlemlerine tabi olacağımı biliyorum.`
    )
    .setFooter(`${main.displaythings.botname} | Ver: ${main.displaythings.version} | Prefix: ${main.displaythings.prefix} | ${main.displaythings.botwebsite}`);

    var doc_user = await UserModel.findOne({ discordID: message.author.id });
    var dilpr = await GuildModel.findOne({ discordID: message.guild.id });
    console.log(doc_user)
    if (!doc_user || doc_user === null) {
      console.log(doc_user)
        return message.channel.send(mitEmbeden).then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 60000);
          msg.react('🇹🇷')
          msg.react('✅')
          .then(r => {
            msg.react('❌')
         
              //Filter
              const backwardsFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
              const forwardsFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
              const engfilter = (reaction, user) => reaction.emoji.name === '🇹🇷' && user.id === message.author.id;
         
              const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
              const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
              const englishs = msg.createReactionCollector(engfilter, { time: 60000 });

              englishs.on('collect', async (reaction, user) => {
                reaction.users.remove(user).catch(console.error);
                msg.edit(mitEmbedtr)
              })
              forwards.on('collect', async (reaction, user) => {
                reaction.users.remove(user).catch(console.error);
                const deletd = await UserModel.deleteMany({ discordID: user.id })
                .then(result => console.log(result))
                .catch(err => console.log(err));
                message.channel.send(Embed("info", "You can't access the bot anymore.", `No data will be kept about you anymore and all your data has been deleted. If you want to use the X bot again, you need to confirm the "License"!`))
              })
              backwards.on('collect', async (reaction, user) => {
                reaction.users.remove(user).catch(console.error);
                const userprofile = await new UserModel({
                  discordID: user.id
                 })
               userprofile.save()
               .then(result => console.log(result))
               .catch(err => console.log(err));
                message.channel.send(Embed("success", "Successfully created profile", `Your profile has been created! Your data will now be kepton ${main.displaythings.botname} servers. You can start using the ${main.displaythings.botname} bot!\n\nAcceptance Status: ${user ? 'Kabul Edildi' : 'Bilinmiyor'}`))
              })
         
            })
          })
    } else {
      var req_user = await UserModel.findOne({ discordID : message.author.id});
      console.log(req_user)
      if (req_user.lang === false) {
        if((command.diger.requiredPermissionsMe || []).length > 0 && !command.diger.requiredPermissionsMe.some(perm => message.guild.me.hasPermission(perm)) && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.channel.send(Embed("error", "ERRCD: 0001 | Permission Error", `${main.displaythings.botname} need the this permission/permissions to run this command:\n${command.diger.requiredPermissionsMe.filter(perm => !message.guild.me.hasPermission(perm)).join('\n')}`)); 
        if((command.diger.requiredPermissions || []).length > 0 && !command.diger.filterServerOwner && !command.diger.requiredPermissions.some(perm => message.member.hasPermission(perm)) && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.channel.send(Embed("error", "ERRCD: 0001 | Permission Error", `To run this command, you need this permission/permissions:\n${command.diger.requiredPermissions.filter(perm => !message.member.hasPermission(perm)).join('\n')}`)); 
        if(command.diger.filterServerOwner && message.guild.owner.user.id !== message.author.id) return message.channel.send(Embed("error", "ERRCD: SV_OWNR | Sadece Sunucu Sahibi", `This command can only be executed by \`SERVER_OWNER\`(<@&${message.guild.owner.user.id}>).`));
        if(command.diger.cooldown && (req_user.cooldown || 0) > Date.now()) return message.channel.send(Embed("warn", "WARNCD: COOLDOWN | Cooldown Time", `You must wait another ${moment.duration((req_cool.cooldown.cldamount || 0) - Date.now()).format('d [days], h [hours], m [mintues], s [seconds]')} to run this command again.`));
      } else {
        if((command.diger.requiredPermissionsMe || []).length > 0 && !command.diger.requiredPermissionsMe.some(perm => message.guild.me.hasPermission(perm)) && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.channel.send(Embed("error", "ERRCD: 0001 | İzin Hatası", `${main.displaythings.botname} need the this permissions/permissions to run this command:\n${command.diger.requiredPermissionsMe.filter(perm => !message.guild.me.hasPermission(perm)).join('\n')}`)); 
        if((command.diger.requiredPermissions || []).length > 0 && !command.diger.filterServerOwner && !command.diger.requiredPermissions.some(perm => message.member.hasPermission(perm)) && message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.channel.send(Embed("error", "ERRCD: 0001 | İzin Hatası", `Bu komutu çalıştırabilmek için şu izine/izinlere ihtiyacınız var:\n${command.diger.requiredPermissions.filter(perm => !message.member.hasPermission(perm)).join('\n')}`)); 
        if(command.diger.filterServerOwner && message.guild.owner.user.id !== message.author.id) return message.channel.send(Embed("error", "ERRCD: SV_OWNR | Sadece Sunucu Sahibi", `Bu komut sadece \`SERVER_OWNER\`(<@&${message.guild.owner.user.id}>) tarafından çalıştırılabilir.`));
        if(command.diger.cooldown && (req_user.cooldown || 0) > Date.now()) return message.channel.send(Embed("warn", "WARNCD: COOLDOWN | Bekleme Süresi", `Bu komutu tekrar çalıştırabilmek için ${moment.duration((req_cool.cooldown.cldamount || 0) - Date.now()).format('d [gün], h [saat], m [dakika], s [saniye]')} daha beklemeniz gereklidir.`));
      }

    command.run(client, message, arguments)
    console.info(`INFO: ${message.author.username} isimli kişi ${commandName} isimli komutu kullandı`);

    if(command.diger.cooldown) {
      if(!['kısa', 'temel'].some(data => data.toLowerCase() == command.diger.cooldown)) return;
      const cooldownMS = require('ms').repacce('kısa', '10s').replace('temel', '30s');
      await UserModel.findOneAndUpdate({discordID: message.author.id}, { $set: { cooldown: `${Date.now() + cooldownMS}` }}, {new: true});
    };
    }
    
  });

client.on("guildCreate", async(guild) => {

  const doc = new GuildModel({ discordID: guild.id })
  await doc.save();

  const req = await GuildModel.findOne({ discordID: guild.id })
  const botname = main.displaythings.botname

  console.info(`[INFO]\n> Eklenen Sunucu: ${guild.name}\n> Eklenen Sunucu ID: ${req.id}`);

  const welcmemb = new Discord.MessageEmbed()
  .setThumbnail(main.displaythings.botlogo)
  .setAuthor(`${botname} Discord Bot`, `${main.displaythings.botlogo}`)
  .addField(
    `${botname} | Hello!`,
    `**Hello. I'm ${main.displaythings.ownername}. Developer of ${botname} Discord Bot. Thanks for adding my bot. I hope you like and enjoy with my bot :)\nThis Server ID: ${req.id}**`
  )
  .addField(
    `${botname} | Prefix`,
    `> **${botname}**'s prefix is \`${main.displaythings.prefix}<command>\`\n> **Another Prefixes:**\n\n> <@&${client.user.id}>\` <command>(Mention-Prefix)\`\n> \`${main.displaythings.secondprefix} <command>\`\n\n> \`${main.displaythings.thirdprefix} <command>\``
  )
  .addField(
    `${botname} | How to use?`,
    `> To take advantage of all the features of **${botname}**, simply type \`${main.displaythings.prefix}help\``
  )
  .addField(
    `${botname} | Guild Language`,
    `> To change the server language **you must (go to the web panel)[https://panel.kokturkbot.ga/]**.\n> :flag_gb:*(Default language is English/EN)*`
  )
  .addField(
    `${botname} | Links`, 
    `> For Links: \`${main.displaythings.prefix}links\``)
  .addField(
    `${botname} | Saving datas`,
    `> We always store user data with encryption. For help with the "Which datas we save?", contact the developer.\n\n> *Developer:* **${main.displaythings.ownerdcname}**`
    )
    .addField(
      `${botname} | Open Source`,
      `> **This bot was coded by Ata İlhan Köktürk.** Please do not delete the reference part! You can only copy this infrastructure for personal use (for example: Training, Learning Code and Handler systems, etc.). If it is copied for profit, the legal process will be initiated! The most important reason it's open source code is to show that there's no malware in our bot. For more information:\n> *DM my Instagram address:* **@atailh4n**`
    )
  .setDescription(
    `**[Invite Bot](${main.displaythings.botinvite})** | **[Support Server](${main.displaythings.botsupserver})** | **[Website](${main.displaythings.botwebsite})**`
  )
  .setFooter(`${botname} | Advanced Turkish/English Bot | 2020-2021`, `${main.displaythings.botlogo}`)
  .setImage(main.displaythings.addedbanner)
  .setTimestamp();

  let defaultChannel = "";
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(welcmemb);

})

client.on("guildDelete", async(guild) => {
  const doc = await GuildModel.deleteMany({ discordID: guild.id })
  console.info(`INFO:\n> Silinen Sunucu: ${guild.name}\n> Silinen ID: ${doc.id}\n> Silinen veri/ler: ${doc}`)
})
};

client.on("roleCreate", async (role, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.roleProtection) return;
  role.delete({ reason: "Köktürk Koruma Sistemi" });
  cezalandir(entry.executor.id, "jail");
  let user = client.users.cache.get(entry.executor.id)
  let logKanali = req.modLogChannel
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda izinsiz bir rol oluşturuldu!').setDescription(`${entry.executor} adlı yetkili tarafından sunucuda izinsiz bir rol oluşturuldu! \n\nSunucuda rolü oluşturan yetkilinin rolleri alındı ve cezalı rolü verildi!`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

client.on("roleDelete", async (role, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.roleProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = client.users.cache.get(entry.executor.id)
  let yeniRol = await role.guild.roles.create({
  data: {
    name: role.name,
    color: role.hexColor,
    hoist: role.hoist,
    position: role.position,
    permissions: role.permissions,
    mentionable: role.mentionable},
    reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"});
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda bir rol izinsiz silindi!').setDescription(`${entry.executor} adlı yetkili tarafından **${role.name}** isimli rol silindi, silen kişi banlandı! \nRol tekrar oluşturuldu.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

client.on("roleUpdate", async (oldRole, newRole, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || !newRole.guild.roles.cache.has(newRole.id) || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.roleProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = client.users.cache.get(entry.executor.id)
  if (yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
  newRole.setPermissions(oldRole.permissions);
  newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
};
  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable});
 let logKanali = client.channels.cache.get(config.logChannelID);
 if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda izinsiz bir rol güncellendi!').setDescription(`${entry.executor} adlı yetkili tarafından **${oldRole.name}** isimli rol izinsiz güncellendi! \n\nGüncelleyen yetkilinin rolleri alındı ve cezalı rol verildi! \n\nRol eski haline getirildi!`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

//-                                                                        KANAL KORUMA                                                                        -\\

client.on("channelCreate", async (channel, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.channelProtection) return;
  channel.delete({reason: "Köktürk Koruma Sistemi"});
  let user = client.users.cache.get(entry.executor.id)
  cezalandir(entry.executor.id, "jail");
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda bir kanal izinsiz oluşturuldu!').setDescription(`${entry.executor} adlı yetkili tarafından sunucuda izinsiz kanal oluşturuldu! Oluşturan yetkilinin rolleri alındı ve jaile atıldı! \nOluşturulan Kanal Silindi.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp().setThumbnail(user.displayAvatarURL({dynamic: true })))}});

client.on("channelDelete", async (channel, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.channelProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = client.users.cache.get(entry.executor.id)
  await channel.clone({ reason: "Köktürk Koruma Sistemi" }).then(async kanal => {
  if (channel.parentID != null) await kanal.setParent(channel.parentID);
  await kanal.setPosition(channel.position);
  if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));});
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('İzinsiz bir kanal silindi!').setDescription(`${entry.executor} adlı yetkili tarafından **${channel.name}** isimli kanal silindi! Silen yetkilinin rolleri alındı ve jaile atıldı! \nSilinen kanal tekrar oluşturuldu.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

client.on("channelUpdate", async (oldChannel, newChanne, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await client.guilds.cache.get(newChannel.guild.id).fetchAuditLogs({ type: 'CHANNEL_UPDATE' }).then(audit => audit.entries.first())
  if (Date.now()-entry.createdTimestamp > 5000) {
  entry = await client.guilds.cache.get(newChannel.guild.id).fetchAuditLogs({ type: 'CHANNEL_OVERWRITE_UPDATE' }).then(audit => audit.entries.first())}
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.channelProtection) return;
  let user = client.users.cache.get(entry.executor.id)
  cezalandir(entry.executor.id, "jail"); 
  if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if (newChannel.type === "category") {newChannel.edit({name: oldChannel.name})} else if (newChannel.type === "text") {newChannel.edit({name: oldChannel.name, topic: oldChannel.topic, nsfw: oldChannel.nsfw, rateLimitPerUser: oldChannel.rateLimitPerUser})} else if (newChannel.type === "voice") {newChannel.edit({name: oldChannel.name, bitrate: oldChannel.bitrate, userLimit: oldChannel.userLimit,})}; oldChannel.permissionOverwrites.forEach(perm => {let thisPermOverwrites = {}; perm.allow.toArray().forEach(p => {thisPermOverwrites[p] = true;}); perm.deny.toArray().forEach(p => {thisPermOverwrites[p] = false;}); newChannel.createOverwrite(perm.id, thisPermOverwrites)});
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('İzinsiz bir kanal güncellendi!').setDescription(`${entry.executor} adlı yetkili tarafından **${newChannel.name}** isimli kanal güncellendi! Güncellenyen yetkilinin rolleri alındı ve jaile atıldı! \nKanal eski haline getirildi.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

//-                                                                        SUNUCU KORUMA                                                                        -\\

client.on("guildUpdate", async (oldGuild, newGuild) => {
  const req = await GuildModel.findOne({ discordID: newGuild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.serverProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = client.users.cache.get(entry.executor.id)
  if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucu izinsiz güncellendi!').setDescription(`${entry.executor} adlı yetkili tarafından Sunucu izinsiz güncellendi! \nGüncelleyen yetkili sunucudan yasaklandı ve sunucu eski haline getirildi.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

client.on("guildMemberRemove", async (member, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.kickProtection) return;
  cezalandir(entry.executor.id, "jail");
  let user = client.users.cache.get(entry.executor.id)
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic: true })).setColor("BLUE").setTitle('Bir kullanıcı izinsiz sunucudan atıldı!').setDescription(`${member} adlı üye, ${entry.executor} adlı yetkili tarafından sunucudan izinsiz atıldı! \n\nKullanıcıyı sunucudan atan yetkilinin yetkileri alındı ve cezalı rolü verildi!.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

client.on("guildBanAdd", async (guild, user) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || guvenli(entry.executor.id) || !config.banProtection) return;
  cezalandir(entry.executor.id, "jail");
  guild.members.unban(user.id, "İzinsiz banlandığı için ban geri açıldı!").catch(console.error);
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Bir kullanıcı izinsiz sunucudan yasaklandı!').setDescription(`${user} adlı üye, ${entry.executor} adlı yetkili tarafından sunucudan izinsiz yasaklandı! \n\n Kullanıcıyı sunucudan yasaklayan yetkilinin rolleri alındı ve cezalı rolü verildi!.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

client.on("guildMemberAdd", async (member, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  if (!member.user.bot || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.botProtection) return;
  cezalandir(entry.executor.id, "jail");
  cezalandir(member.id, "ban");
  let user = client.users.cache.get(entry.executor.id)
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuya izinsiz bir bot eklendi!').setDescription(`${member} adlı botu, ${entry.executor} adlı yetkili tarafından sunucuya izinsiz eklendi! \n\nEkleyen yetkili ve bot sunucudan yasaklandı.`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}});

client.on("guildMemberUpdate", async (oldMember, newMember, guild) => {
  const req = await GuildModel.findOne({ discordID: guild.id })
  function guvenli(kisiID) {
    let uye = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    let betasafe = client.whitelist || req.trustRole || [];
    if (!uye || uye.id === client.user.id || uye.id === main.sahip || uye.id === uye.guild.owner.id || betasafe.some(beta => uye.id === beta || uye.roles.cache.has(beta))) return true
  else return false};

  const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
  function cezalandir(kisiID, tur) {
    let userID = client.guilds.cache.get(req.discordID).members.cache.get(kisiID);
    if (!userID) return;
    if (tur == "jail") return userID.roles.cache.has(req.boosterRole) ? userID.roles.set([req.boosterRole, req.jailRole]) : userID.roles.set([req.jailRole]);
    if (tur == "ban") return userID.ban({ reason: "Kökturk Koruma Sistemi" }).catch()};

  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
  let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.rightClickProtection) return;
  if (yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
  cezalandir(entry.executor.id, "jail");
  let user = client.users.cache.get(entry.executor.id)
  let logKanali = client.channels.cache.get(config.logChannelID);
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuda izinsiz yetki yükseltildi').setDescription(`${newMember} adlı üyeye ${entry.executor} isimli yetkili tarafından sunucuda izinsiz yetki verildi! \nYetki veren yetkili sunucudan yasaklandı ve verilen yetki geri alındı!`).setFooter(`Köktürk Koruma Sistemi`).setTimestamp())}}}});

const Dashboard = new DBD.Dashboard({
    port: main.port,
    domain: `${main.domain}/discord/callback`,
  sessionFileStore: false,
  invite: {
    redirectUri: `${main.domain}/manage`,
    permissions: '8',
    clientId: main.clientid,
  },
  noCreateServer: false,
    client: {
        id: main.clientid,
        secret: main.secret
    },
    redirectUri: `${main.domain}/discord/callback`,
    domain: main.domain,
    bot: client,
    websiteTitle: 'Köktürk - Dashboard',
    iconUrl: "https://i.hizliresim.com/8d38qrg.jpg",
    theme: CaprihamTheme({
        privacypolicy: {
            websitename: "Köktürk Discord Bot",
            websiteurl: "(kokturkbot.ga, kokturk.ga)",
            supportemail: "support@kokturk.ga"
       },
      websiteName: "Köktürk",
      iconURL: `https://i.hizliresim.com/8d38qrg.jpg`,
      index: {
          card:{
              title: "Köktürk - 1# Numaralı Discord Botu",
              description: "Köktürk Discord Botu. En kolay Discord botudur ve diğer botlardan onu ayıran şey <b><b><i>tamamen güvenli ve onaylı geliştirici olan Ata İlhan Köktürk</b></b></i> tarafıdan yapılmış olmasıdır.",
              image: "https://i.hizliresim.com/mbg20ij.jpg",
          },
          information: {
              title: "Ufak Bilgiler",
              description: "Botu yönetmek için, <a href='/manage'>Sunucu Yönetimi Sayfasına</a> giriş yapın.<br><br>Tüm komutları görmek için <a href='/commands'>Komutlar Sayfasına</a> gidin.<br><br><b><i>Umarım keyifli vakit geçirirsin</i></b>"
          },
          feeds: {
              title: "Akış",
              list: [
                  {
                      icon: "fa fa-user",
                      text: "Kullanıcı Arayüz Sürümü",
                      timeText: `${UserModel.findOne({discordID: {}}).size()}`,
                      bg: "bg-light-info"
                  },
                  {
                      icon: "fa fa-server",
                      text: "Uptime",
                      timeText: `Downtime olmadı.`,
                      bg: "bg-light-danger"
                  }
              ]
          }
      },
      commands: {
          pageTitle: "Komutlar",
          table: {
              title: "Komutlar Listesi",
              subTitle: `${main.displaythings.botname}'ün tüm komutları`,
              list: 
              [
                  {
                      commandName: "Ban",
                      commandUsage: `${main.displaythings.prefix}ban @User/ID/Name`,
                      commandUsageEN: `${main.displaythings.prefix}ban @User/ID/Name`,
                      commandDescription: "Kullanıcıları banlamaya yarar"
                  },
                  {
                      commandName: "Duyuru",
                      commandUsage: `${main.displaythings.prefix}duyuru <Mesaj> or `,
                      commandUsageEN: `${main.displaythings.prefix}announce <Message>`,
                      commandDescription: "Duyuru yapmanızı sağlar"
                  }
              ]
          }
      }
  }),
        settings: [
      {
          categoryId: 'setup',
          categoryName: "Kurulum",
          categoryDescription: "Temel ayarlar ve moderasyon!",
          categoryOptionsList: [
              {
                  optionId: 'annch',
                  optionName: "Duyuru Kanalı",
                  optionDescription: "Duyuru kanalı seç!",
                  optionType: DBD.formTypes.channelsSelect(),
                  getActualSet: async ({guild}) => {
                    const req = await GuildModel.findOne({ discordID: guild.id })
                      return req.announceChannel || null;
                  },
                  setNew: async ({guild,newData}) => {
                      await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { announceChannel: newData }}, {new: true});
                      return;
                  }
              },
              {
                  optionId: 'modlogch',
                  optionName: "Mod-Log Kanalı",
                  optionDescription: "Botun nereye moderasyon loglarını atacağını belirler",
                  optionType: DBD.formTypes.channelsSelect(),
                  getActualSet: async ({guild}) => {
                    const req = await GuildModel.findOne({ discordID: guild.id })
                      return req.modLogChannel || false;
                  },
                  setNew: async ({guild,newData}) => {
                    await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { modLogChannel: newData }}, {new: true});
                      return;
                  }
              },
              {
                optionId: 'guildlang',
                optionName: "Sunucu Dili",
                optionDescription: "Sunucunun dilini değiştirir.",
                optionType: DBD.formTypes.select({"English": false, "Türkçe": true}, false),
                getActualSet: async ({guild}) => {
                  const req = await GuildModel.findOne({ discordID: guild.id })
                    return req.guildLang || false;
                },
                setNew: async ({guild,newData}) => {
                      await GuildModel.findOneAndUpdate({ discordID: guild.id }, { $set: { guildLang: newData }}, { new: true})
                      console.info(`INFO:\n> Sunucu dili ${newData} ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                    return;
                },
              },
              {
                optionId: 'boosterrole',
                optionName: "Booster Rolü",
                optionDescription: "Booster Rolünü ekleyin. Birçok durumda gereklidir.",
                optionType: DBD.formTypes.rolesSelect(false),
                getActualSet: async ({guild}) => {
                  const req = await GuildModel.findOne({ discordID: guild.id })
                    return req.boosterRole || null;
                },
                setNew: async ({guild,newData}) => {
                      await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { boosterRole: newData }}, { new: true})
                        console.info(`INFO:\n> Booster Rol ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                        return;
                },
              },
              {
                optionId: 'trustrole',
                optionName: "Güvenilir Rolü",
                optionDescription: "Güvenilir bir rol ekleyin. Birçok durumda gereklidir.",
                optionType: DBD.formTypes.rolesSelect(false),
                getActualSet: async ({guild}) => {
                  const req = await GuildModel.findOne({ discordID: guild.id })
                    return req.trustRole || null;
                },
                setNew: async ({guild,newData}) => {
                      await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { trustRole: newData }}, { new: true})
                        console.info(`INFO:\n> Güvenli Rol ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                        return;
                },
              },
              {
                optionId: 'jailrole',
                optionName: "Hapis (Jail) Rolü",
                optionDescription: "Hapis rolünü ekleyin. Birçok durumda gereklidir.",
                optionType: DBD.formTypes.rolesSelect(false),
                getActualSet: async ({guild}) => {
                  const req = await GuildModel.findOne({ discordID: guild.id })
                    return req.jailRole || null;
                },
                setNew: async ({guild,newData}) => {
                      await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { jailRole: newData }}, { new: true})
                        console.info(`INFO:\n> Güvenli Rol ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                        return;
                },
              },
          ],
      },
      {
        categoryId: 'moderation',
          categoryName: "Moderasyon",
          categoryDescription: "Moderasyon sistemini ayarlar!",
          categoryOptionsList: [
            {
              optionId: 'role_prtc',
              optionName: "Rol Koruma",
              optionDescription: "Rol koruma sistemini açıp kapamaya yarar.",
              optionType: DBD.formTypes.select({"Kapalı": false, "Açık": true}, false),
              getActualSet: async ({guild}) => {
                const req = await GuildModel.findOne({ discordID: guild.id })
                  return req.channelProtection || null;
              },
              setNew: async ({guild,newData}) => {
                  await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { channelProtection: newData }}, {new: true})
                  console.info(`INFO:\n> Rol Koruma ${newData} olarak ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                  return;
              },
            },
            {
              optionId: 'chnl_prtc',
              optionName: "Kanal Koruma",
              optionDescription: "Kanal koruma sistemini açıp kapamaya yarar.",
              optionType: DBD.formTypes.select({"Kapalı": false, "Açık": true}, false),
              getActualSet: async ({guild}) => {
                const req = await GuildModel.findOne({ discordID: guild.id })
                  return req.channelProtection || null;
              },
              setNew: async ({guild,newData}) => {
                  await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { channelProtection: newData }}, {new: true})
                  console.info(`INFO:\n> Kanal Koruma ${newData} olarak ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                  return;
              },
            },
            {
              optionId: 'bot_prtc',
              optionName: "Bot Koruma",
              optionDescription: "Bot koruma sistemini açıp kapamaya yarar.",
              optionType: DBD.formTypes.select({"Kapalı": false, "Açık": true}, false),
              getActualSet: async ({guild}) => {
                const req = await GuildModel.findOne({ discordID: guild.id })
                  return req.botProtection || null;
              },
              setNew: async ({guild,newData}) => {
                  await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { botProtection: newData }}, {new: true})
                  console.info(`INFO:\n> Bot Koruma ${newData} olarak ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                  return;
              },
            },
            {
              optionId: 'ban_prtc',
              optionName: "Ban Koruma",
              optionDescription: "Ban koruma sistemini açıp kapamaya yarar.",
              optionType: DBD.formTypes.select({"Kapalı": false, "Açık": true}, false),
              getActualSet: async ({guild}) => {
                const req = await GuildModel.findOne({ discordID: guild.id })
                  return req.banProtection || null;
              },
              setNew: async ({guild,newData}) => {
                  await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { banProtection: newData }}, {new: true})
                  console.info(`INFO:\n> Ban Koruma ${newData} olarak ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                  return;
              },
            },
            {
              optionId: 'kick_prtc',
              optionName: "Kick Koruma",
              optionDescription: "Kick koruma sistemini açıp kapamaya yarar.",
              optionType: DBD.formTypes.select({"Kapalı": false, "Açık": true}, false),
              getActualSet: async ({guild}) => {
                const req = await GuildModel.findOne({ discordID: guild.id })
                console.log(req.kickProtection)
                  return req.kickProtection || null;
              },
              setNew: async ({guild,newData}) => {
                  await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { kickProtection: newData }}, {new: true})
                  console.info(`INFO:\n> Kick Koruma ${newData} olarak ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                  return;
              },
            },
            {
              optionId: 'server_prtc',
              optionName: "Sunucu Koruma",
              optionDescription: "Sunucu koruma sistemini açıp kapamaya yarar.",
              optionType: DBD.formTypes.select({"Kapalı": false, "Açık": true}, false),
              getActualSet: async ({guild}) => {
                const req = await GuildModel.findOne({ discordID: guild.id })
                  return req.serverProtection || null;
              },
              setNew: async ({guild,newData}) => {
                  await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { serverProtection: newData }}, {new: true})
                  console.info(`INFO:\n> Sunucu Koruma ${newData} olarak ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                  return;
              },
            },
            {
              optionId: 'right_prtc',
              optionName: "Sağ Tık Koruma",
              optionDescription: "Sağ tık koruma sistemini açıp kapamaya yarar.",
              optionType: DBD.formTypes.select({"Kapalı": false, "Açık": true}, false),
              getActualSet: async ({guild}) => {
                const req = await GuildModel.findOne({ discordID: guild.id })
                  return req.rightClickProtection || null;
              },
              setNew: async ({guild,newData}) => {
                  await GuildModel.findOneAndUpdate({ discordID: guild.id }, {$set: { rightClickProtection: newData }}, {new: true})
                  console.info(`INFO:\n> Rol Koruma ${newData} olarak ayarlandı.\n> Sunucu İsim: ${guild.name}`)
                  return;
              },
            },
          ],
      },
  ],
});

Dashboard.init();