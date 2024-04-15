const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/logs")
module.exports = {
   name: 'setlog-bag', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: "ADMINISTRATOR",

 async execute ( client, message, prefix, db){
const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**Bag log has been set successfully**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
try{
let args = message.content.split(" ")
let channel = message.mentions.channels.first() ||
message.guild.channels.cache.get(args[1])
  if(!channel)return message.reply({content: `**:x: - يُرجى منشن او وضع ايدي الشات**`});
  let data = await r.findOne({guildID: message.guild.id,channelID:channel.id,type:"bag"})
  if(data){

data.channelID = channel.id
  await data.save()
message.reply({embeds:[embed]})
}else if (!data){
data = await r.create({
  guildID:message.guild.id,
  channelID:channel.id,
  type:"bag"
})
await data.save()
    message.reply({embeds:[embed]})
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