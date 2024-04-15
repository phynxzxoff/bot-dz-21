const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/items")
module.exports = {
   name: 'add-store', 
   description: '',
   aliases: ['اضافة-عنصر'],
  guildOnly: true,
  cooldown: 5,
  permissions: 'ADMINISTRATOR',

 async execute ( client, message, prefix, db){

try{
const args = message.content.split(" ")
  const item = args[2]
  const price = args[1]

if(!item || !price || isNaN(price))return message.reply({content: `**:x: - يُرجى وضع اسم للعنصر و سعر**`});

let data = await r.findOne({guildID:message.guild.id})
  if(!data){
data = await r.create({guildID:message.guild.id})
  }
  let a;
  if(data){
    a = data.items.find(m => m.name == item)
  }
  if(a){
    message.reply({content: `**:x: - العنصر مضاف بالفعل**`})
  } else if(!a){

  data.items.push({
    name:item,
    price:price
  })
   await data.save()
const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**Item created successfully**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})
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