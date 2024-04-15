const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 

module.exports = {
   name: 'bot', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){
const embed = new MessageEmbed()
   .addField(`**My Name : **`,`**${client.user.username}**`)
.addField(`**My Tag : **`,`**${client.user.discriminator}**`)
.addField(`**Created At :**`,`**<t:${Math.floor((new Date(client.user.createdTimestamp)).getTime()/1000)}:R>**`)
.addField(`**Joined At :**`,`**<t:${Math.floor((new Date(message.guild.me.joinedAt)).getTime()/1000)}:R>**`)
.addField(`**My Developer :**`,`**<@931315998487887882> || Killr**`)
   .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor(message.guild.me.roles.highest.hexColor)
   try{
  await message.reply({embeds:[embed]})
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