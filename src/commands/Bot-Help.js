//Modules
const Discord = require('discord.js')
//Models
const UserModel = require('../models/UserModel.js')
//External
const main = require('../other/Main_Info.js')
const Embed = require('../other/Embed_UI.js')
exports.run = async(client, message, args) => {


let suplink = "https://panel.kokturk.ga/commands"
let dil = await UserModel.findOne({ discordID: message.author.id })
console.log(message.author.id)

if (dil.lang === false) {
    message.channel.send(Embed("general", "Do you want list commands? Need Help?", `[Click here](${suplink}) to go Commands`))
} else {
    message.channel.send(Embed("general", "Komutları mı listelemek istiyorsun? Yardım mı lazım?", `[Buraya tıklayarak](${suplink}9 komutlara erişebilirsin.`))
}
}


exports.diger = {
    aliases: [`help`, `y`, `h`, `yardim`, `commands`, `komutlar`], 
    requiredPermissions: [],
    requiredPermissionsMe: [`ADMINISTRATOR`],
    filterServerOwner: false,
    runInDM: false,
    cooldown: 'orta'
}
exports.temel = {
    name: `yardım`,
    categorytr: `Genel`,
    categoryen: `Main`
}