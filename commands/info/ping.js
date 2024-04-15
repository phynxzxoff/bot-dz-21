const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 

module.exports = {
   name: 'ping', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){

try{
await message.reply({content: `**pong**`}).then(msg => {
  setTimeout( async() => {
    
 await msg.edit({content: `\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ws.ping)} ms.\`\`\``})
  }, 2000)
})
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