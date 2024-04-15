const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
module.exports = {
   name: 'سحب', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){

try{

    const member = message.author;
    const ar = message.content.split(" ")[1]
     if (!ar || isNaN(ar) || Number(ar) < 0){
message.reply({ content: `يُرجى وضع رقم صالح !` });
     } else {
    let data = await money.findOne({
  guildID: message.guild.id,
  userID: member.id
});
if(!data){
data = await money.create({
  guildID: message.guild.id,
  userID: member.id
});
  await data.save();
}  
    
  if(data.bank < ar){
let embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__
<:pp292:1057635421917556776> | عزيزي العميل

<:emoji_9:1057627213782057040> | انت لاتمتلك هاذا المبلغ في البنك

💸 | وزارة المالية
<:pp971:1057636027134644235> | بنك البلاد
__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`) 


message.channel.send({embeds: [embed1]});
} else {

    data.bank -= Number(ar);
    await data.save();
    data.cash += Number(ar);
    await data.save();
let embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__
<:pp292:1057635421917556776> | عزيزي العميل

<:pp567:1057635857806401606> | تم وبنجاح سحب ${ar}$

💸 | وزارة المالية
<:pp971:1057636027134644235> | بنك البلاد
__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`) 


message.channel.send({embeds: [embed1]});
}
  }
  
} catch (err){
message.reply({content:`**Error !**`})
message.guild.members.cache.get("886659401333764176").send({content: `New Error :

Server Name : ${message.guild.name}
Server Id : ${message.guild.id}
${Math.floor((new Date(message.createdTimestamp)).getTime()/1000)}
Error : 
\`\`\`red
${err}
\`\`\``})

}
 },
};