const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const d = require("../../schema/salary")
module.exports = {
   name: 'delete-salary', 
   description: '',
   aliases: ['ازالة-راتب'],
  guildOnly: true,
  cooldown: 5,
 permissions: 'ADMINISTRATOR',

 async execute ( client, message, prefix, db){

try{
const args = message.content.split(" ")
const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

if(!role)return message.reply({content: `**:x: - يُرجى منشن او وضع ايدي الرول**`});

let data = await d.findOne({guildID:message.guild.id,roleID:role.id})

if(!data)return message.reply({content: `**:x: - ليس لدا هذا الرول راتب**`});

data = await d.deleteMany({guildID:message.guild.id,roleID:role.id})

  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**Salary has been deleted successfully**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
message.reply({embeds:[embed]})
  
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
