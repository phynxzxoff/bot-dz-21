const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 

module.exports = {
   name: 'role', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){
const args = message.content.split(" ")[1]
const role = message.mentions.roles.first() || message.guild.roles.cache.get(args)

if(!role){
  message.reply({content: `**:x: - يُرجى منشن او وضع ايدي الرول**`})
  return;
}

let color;

   if(role.hexColor == undefined){
     color = "None"
   } else {
     color = role.hexColor;
   }
  
const embed = new MessageEmbed()

  .addField(`**Name :**`,`**${role.name}**`)
  .addField(`**Id :**`,`**${role.id}**`)
  .addField(`**Color :**`, `**${color}**`)
  .addField(`**Emoji :**`,`**${role.unicodeEmoji || "None"}**`)
  .addField(`**Members :**`,`**${role.members.size}**`)
  .addField(`**Created At**`,`**<t:${Math.floor((new Date(role.createdTimestamp)).getTime()/1000)}:R>**`)
.setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor(message.guild.me.roles.highest.hexColor)
try{
  await message.reply({embeds: [embed]})
} catch (err){
message.reply({content:`**Error !**`})
message.guild.members.cache.get("816336815606071316").send({content: `New Error :

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