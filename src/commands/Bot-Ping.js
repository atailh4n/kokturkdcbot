exports.run = (client, message, args) => {

  return message.channel.send('🏓 Pong! '+client.ws.ping.toFixed()+'ms! ');
  
};
exports.diger = {
  aliases: [], // exports.help.name kısmında ki değer dışında ne yazılırsa komut çalıştırılacak? örnek: ['pong', 'pingim'], 
  requiredPermissions: [], // komutu kullananın hangi yetkilere sahip olması gerektiği. örnek: ['MANAGE_CHANNELS', 'ADD_REACTIONS'],
  requiredPermissionsMe: [], // botun bu komutu çalıştırabilmesi için hangi yetkilere sahip olması gerektiği. örnek: ['ATTACH_FILES'],
  filterServerOwner: false, // false yaparsanız komutu yetkisi yeten herkes, true yaparsanız sadece sunucu sahibi kullanabilir
  runInDM: false,// false yaparsanız komut botun dmsinde çalışmaz, true yaparsanız botun dmsinde çalışır,
  cooldown: 'uzun'// readme detaylar bakın
};

exports.temel = {
  name: `ping`,// komut ismi
  nameen: `ping`, //ingilizce ismii
  categoryen: `Bot`, //kategori ingilizce
  categorytr: `Bot`, // kategori türkçe
  descriptionen: `Check ping`, // açıklama ingilizce
  descriptiontr: `Pingi ölçün`, // açıklama türkçe
  usageen: `ping`, // kullanım örnek ingilizce
  usagetr: `ping` // kullanım örnek türkçe
};

/*

BU KOMUT ÖRNEKTİR, KOMUTU ÇALIŞTIRMAK İÇİN PREFİXİ YAZIP SONRA KOMUTUN İSMİNİ YAZMALISINIZ. BAŞKA KOMUT EKLEYECEKSENİZ,
EXPORTS.DIGER VE EXPORTS.TEMEL VARIABLELAR DIŞINDA AYNI OLMAK ZORUNDA YOKSA HATA ALIRSINIZ.

*/
