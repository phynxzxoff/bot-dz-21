const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/replys.js")
module.exports = {
   name: 'delete-reply', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: "ADMINISTRATOR",

 async execute ( client, message, prefix, db){

try{

  const args = message.content.split(" ").slice(2).join(" ")

 const id = message.content.split(" ")[1]

if(!id || !args)return message.reply({content: `**:x: - يُرجى وضع ايدي الكلمة و الرد**`});

  

let reply = await r.findOne({guildID:message.guild.id,ID:id})

if(reply){ 
let obj = reply.replys.find(m => m == args)

  if(!obj){
message.reply({content: `**:x: - لا يمكنني ايجاد هذا الرد , يُرجى التحقق من الرد**`})
    return;
}
reply.replys.splice(reply.replys.indexOf(obj, 1))

const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**Reply deleted successfully **`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})
  reply.save();
  
}else if(!reply){
message.reply({content: `**:x: - ليس بإمكاني ايجاد هذا الايدي , يُرجى التحقق من الايدي**`})
return;
  }


  
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