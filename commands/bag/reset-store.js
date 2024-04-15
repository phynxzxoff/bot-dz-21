const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 

module.exports = {
   name: 'reset-store', 
   description: '',
   aliases: [],
  guildOnly: true,
  cooldown: 5,
 permissions: 'ADMINISTRATOR',

 async execute ( client, message, prefix, db){

try{
  
const data = db.get(`items_${message.guild.id}`)
  
if(data){
db.delete(`items_${message.guild.id}`)
  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**Market reset successfully**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})
  message.guild.members.cache.forEach(m => {
  let d = db.get(`bag_${m.id}_${message.guild.id}`)
if(d){
  db.delete(`bag_${m.id}_${message.guild.id}`)
  }
})
} else {
  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**Market reset successfully**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})

  message.guild.members.cache.forEach(m => {
  let d = db.get(`bag_${m.id}_${message.guild.id}`)
if(d){
  db.delete(`bag_${m.id}_${message.guild.id}`)
  }
})
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