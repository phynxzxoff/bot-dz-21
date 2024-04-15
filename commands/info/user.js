const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 

module.exports = {
   name: 'user', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){
const args = message.content.split(" ")[1]
const member = message.mentions.members.first() || message.guild.members.cache.get(args) || message.member
   
const embed = new MessageEmbed()

  .addField(`**Name :**`,`**${member.user.username}**`)
  .addField(`**Tag :**`,`**${member.user.discriminator}**`)
  .addField(`**Id :**`,`**${member.user.id}**`)
  .addField(`**Created At**`,`**<t:${Math.floor((new Date(member.user.createdTimestamp)).getTime()/1000)}:R>**`)
  .addField(`**Joined At**`,`**<t:${Math.floor((new Date(member.joinedAt)).getTime()/1000)}:R>**`)
  .addField(`**Has Nitro :**`,member.premiumSince ? '**Yes**' : '**No**')
  
.setImage(member.user.displayAvatarURL({dynamic:true}))
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