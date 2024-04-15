const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
module.exports = {
   name: 'تحويل', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){

try{

    const member = message.mentions.members.first();
    const ar = message.content.split(" ")[2]
    if(!member)return message.reply({content: `يُرجى منشن للشخص`})
     if (!ar || isNaN(ar) || Number(ar) < 0){
message.reply({ content: `يُرجى وضع رقم صالح !` });
     } else {
    let data = await money.findOne({
  guildID: message.guild.id,
  userID: member.id
});
    let data1 = await money.findOne({
  guildID: message.guild.id,
  userID: message.author.id
});
if(!data){
data = await money.create({
  guildID: message.guild.id,
  userID: member.id
});
  await data.save();
}  
if(!data1){
data1 = await money.create({
  guildID: message.guild.id,
  userID: message.author.id
});
  await data1.save();
}  
const money1 = data1.bank
  if(money1 < ar){
let embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__
<:pp292:1057635421917556776>  | عزيزي العميل

<:emoji_9:1057627213782057040> | انت لاتمتلك هاذا المبلغ

💸 | وزارة المالية
<:pp971:1057636027134644235> | بنك البلاد
__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`) 


message.channel.send({embeds: [embed1]});
} else {

    const n =  data1.bank - Number(ar)
    const n1 = n - ar
    if(n === 0){
      
    return message.reply("**لايمكنك تحويل كل فلوسك - <:emoji_9:1057627213782057040>**")
  
    
    }else if(n > 0){
      data.bank += Number(ar);
    await data.save();
      data1.bank -= Number(ar);
    await data1.save();
    let embed1 = new MessageEmbed()
          .setAuthor({name : message.author.username, iconURL:  message.author.displayAvatarURL({ dynamic: true })})
          .setFooter({ text : client.user.username, iconURL :client.user.displayAvatarURL({ dynamic: true })})
.setDescription(`**__
<:pp292:1057635421917556776>  | عزيزي العميل

<:emoji_8:1057626985825837086> | تم وبنجاح تحويل ${ar}$ الى ${member}

💸 | وزارة المالية
<:pp971:1057636027134644235> | بنك البلاد
__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`) 


message.channel.send({embeds: [embed1]});
    } else if(n < 0){
      message.reply("**لا يمكنك تحويل مبلغ اقل من 0**")
    }

}
  }
  
} catch (err){
 console.log(err)
/*
message.reply({content:`**Error !**`})
message.guild.members.cache.get("").send({content: `New Error :

Server Name : ${message.guild.name}
Server Id : ${message.guild.id}
${Math.floor((new Date(message.createdTimestamp)).getTime()/1000)}
Error : 
\`\`\`red
${err}
\`\`\``})
  */

}
 },
};