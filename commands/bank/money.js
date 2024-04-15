const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
module.exports = {
   name: 'فلوسي', 
   description: '',
   aliases: ['فلوس','money'],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){

try{
const member = message.mentions.members.first() || message.author;
if(member){
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
 
const embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__
 <:pp292:1057635421917556776> | عزيزي العميل

 <:pp985:1057636233246937118>  | الكاش : ${data.cash !== undefined ? data.cash : 0}$

 <:pp567:1057635857806401606>  | البنك : ${data.bank !== undefined ? data.bank : 5000}$

 💸 | وزارة المالية
<:pp971:1057636027134644235> | بنك البلاد
__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`) 

  
message.channel.send({embeds: [embed1]});
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