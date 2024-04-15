const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/replys.js")
module.exports = {
   name: 'replys', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 //permissions: "ADMINISTRATOR",

 async execute ( client, message, prefix, db){

try{

  const reply = await r.find({guildID:message.guild.id})
const replys = []
  if(reply){

    const data = reply.map((value, index) => {
      let re = value.replys.join(" , ")
      if(re == 0){
        re = "لا يوجد"
      }
      replys.push(`#${index+1}
> \`Word:\` ${value.word}
> \`ID:\` ${value.ID}
> \`Replys:\` ${re}`)
    })
    if(data.length <= 0){
replys.push("No words and replys have been added")
    }

  }
  
const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setDescription(`**${replys.join("\n")}**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor(message.guild.me.roles.highest.hexColor)

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

