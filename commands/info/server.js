const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 

module.exports = {
   name: 'server', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){
const args = message.content.split(" ")[1]

const members = message.guild.members.cache

const channels = message.guild.channels.cache

const roles = message.guild.roles.cache

const emojis = message.guild.emojis.cache
   
   const ch = channels.filter(m => m.type === "GUILD_TEXT").size + channels.filter(m => m.type === "GUILD_VOICE").size
   
const embed = new MessageEmbed()

.addField(`**Name :**`,`**${message.guild.name}**`)
.addField(`**Id :**`,`**${message.guild.id}**`)
.addField(`**Members : (${message.guild.memberCount})**`,`**${members.filter(m => m.presence?.status== 'online').size} Online\n${message.guild.premiumSubscriptionCount} Boosts**`)
.addField(`**Channels : (${ch})**`,`**${channels.filter(m => m.type === "GUILD_TEXT").size} Text | ${channels.filter(m => m.type === "GUILD_VOICE").size} Voice**`)
.addField(`**Roles :**`,`**${roles.size}**`)
.addField(`**Emojis :**`,`**${emojis.size}**`)
.addField(`**Created At**`,`**<t:${Math.floor((new Date(message.guild.createdTimestamp)).getTime()/1000)}:R>**`)
.setImage(message.guild.iconURL({dynamic:true}))
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