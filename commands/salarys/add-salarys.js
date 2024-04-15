const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const d = require("../../schema/salary")
const r = require("../../schema/bank-system")
module.exports = {
   name: 'توزيع',
   description: '',
   aliases: ["توزيع"],
  guildOnly: true,
  cooldown: 5,
 permissions: 'ADMINISTRATOR',

 async execute ( client, message, prefix, db){

try{

  let salarys = await d.find({guildID:message.guild.id})

  salarys.map((value,index) => {
    message.guild.roles.cache.get(value.roleID).members.forEach(async m=>{
      let data = await r.findOne({guildID:message.guild.id,userID:m.id})
      if(!data){
        data = await r.create({
          guildID:message.guild.id,
          userID:m.id
        })
data.save()
      }

      data.bank += value.salary
      data.save()
    })
  })

  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("** تم توزيع الرواتب بنجاح | ✅ **")
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
