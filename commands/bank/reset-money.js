const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
module.exports = {
   name: 'reset-money', 
   description: '',
   aliases: ['تصفير-فلوس'],
  guildOnly: true,
  cooldown: 5,
 permissions: "ADMINISTRATOR",

 async execute ( client, message, prefix, db){

try{
const args = message.content.split(" ")
const member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
  if(!member)return message.reply({content: `**:x: - يُرجى منشن او وضع ايدي العضو**`})
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
.setDescription(`**لـقـد تـم تصفـيـر حـسابات مواطنين دولـة نايت لايف ب نجاح | <:Night4:1046482365456859156>**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setColor(`#D69600`) 
  data.cash = 0
  await data.save()
  data.bank = 0
  await data.save()
message.reply({embeds: [embed1]});
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