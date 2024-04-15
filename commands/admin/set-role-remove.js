const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const Module = require("../../schema/roles-remove.js")
module.exports = {
   name: 'set-role-remove', 
   description: 'set-role-remove',
   aliases: ['set-role-remove'],
  guildOnly: true,
  cooldown: 5,
 permissions: 'ADMINISTRATOR',

 async execute ( client, message, prefix, db){

   let roles = message.mentions.roles?.map(c => c.id);

  

const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**The roles have been successfully added to the data**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
   
try{
if(roles.length == 0){
  message.reply({content: `**:x: - يُرجى منشن الرولات**`})
  return;
}
 roles.forEach(async role => {
let data = await Module.findOne({serverID: message.guild.id,roleID:role,type:"activity"})
     console.log(data)

if(data) return;
data = await new Module({serverID: message.guild.id,roleID:role,type:"activity"})
await data.save()
  console.log(data)
})
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
