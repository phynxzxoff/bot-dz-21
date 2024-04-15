const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 

module.exports = {
   name: 'channel', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){
const args = message.content.split(" ")[1]
const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args)

if(!channel){
  message.reply({content: `**:x: - يُرجى منشن او وضع ايدي الشات**`})
  return;
}

  let type;
  let nsfw;
  let topic;
   
   if(channel.type == "GUILD_TEXT"){
     type = "Text"
   } else if(channel.type == "GUILD_VOICE"){
     type = "Voice"
   } else if(channel.type == "GUILD_CATEGORY"){
     type = "Category"
   }
   if(channel.nsfw == true){
     nsfw = "True"
} else if(channel.nsfw == false) {
     nsfw = "False"
}
   if(channel.topic == null){
     topic = "None"
} else {
     topic = channel.topic
}
console.log(channel)

const embed = new MessageEmbed()

  .addField(`**Name :**`,`**${channel.name}**`)
  .addField(`**Id :**`,`**${channel.id}**`)
  .addField(`**Type :**`, `**${type}**`)
  .addField(`**Nsfw :**`,`**${nsfw}**`)
  .addField(`**Topic :**`,`**${topic}**`)
  .addField(`**Created At**`,`**<t:${Math.floor((new Date(channel.createdTimestamp)).getTime()/1000)}:R>**`)
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