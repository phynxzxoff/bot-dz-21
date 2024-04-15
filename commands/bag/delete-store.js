const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/bag-system")
const i = require("../../schema/items")
module.exports = {
   name: 'delete-store', 
   description: '',
   aliases: ['حذف-عنصر'],
  guildOnly: true,
  cooldown: 5,
 permissions: 'ADMINISTRATOR',

 async execute ( client, message, prefix, db){

try{
const args = message.content.split(" ")
  const name = args[1]

if(!name)return message.reply({content: `**:x: - يُرجى وضع اسم العنصر**`});

let data = await i.findOne({guildID:message.guild.id})
  if(!data){
data = i.create({guildID:message.guild.id})
     await data.save();
}
  
  
  
  
 
 let items = data.items.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))

    if(items.length <= 0)return message.reply({content: `**:x: - ليس بإمكاني ايجاد هذا العنصر , يُرجى التحقق من اسم العنصر**`});

    if(items.length == 1){
 let a;

        a = items.find(m => m.name == items.name)
            const embed = new MessageEmbed()

.setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**Item deleted successfully**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

      message.reply({embeds:[embed]})

        message.guild.members.cache.forEach(async m => {
  let d = await r.findOne({guildID:message.guild.id,userID:m.id})
 if(d){
    const ti = d.inv.find(m => m.item == a.name)
if(ti){
d.inv.splice(d.inv.indexOf(ti),1)
  await d.save();
 }
          }
 })
       
data.items.splice(data.items.indexOf(a), 1)
await data.save();
      return;
    }

    let test = items.map((c,i) => `${++i} - ${c.name}`)
    let embed = new MessageEmbed()
    .setDescription(`Multple items found. Please choose one of the following, or type cancel.\n${test.join("\n")}`)
    message.channel.send({
      embeds:[embed]
    }).then(msg => {
      let filter = r => r.author.id === message.author.id && Number(r.content);
      message.channel.awaitMessages({
        filter,
        max: 1,
        time: 20000,
        errors: ["time"]
      }).then( async collected => {
        let content = Number(parseInt(collected.first().content));
        if(content > items.length || content === 0) return collected.first().reply(`**:x: -يُرجى وضع رقم من 1 الى ${items.length}**`)
        let item = items[content-1]

         let a;

        a = data.items.find(m => m.name == item.name)
            const embed = new MessageEmbed()

.setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**Item deleted successfully**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")


        message.guild.members.cache.forEach(async m => {
  let d = await r.findOne({guildID:message.guild.id,userID:m.id})
 if(d){
    const ti = d.inv.find(m => m.item == item.name)
if(ti){
d.inv.splice(d.inv.indexOf(ti),1)
  await d.save();
 }
          }
 })
       
data.items.splice(data.items.indexOf(a), 1)
  await data.save();
        collected.first().delete().catch(err => 0)
        return msg.edit({embeds: [embed]})
      }).catch(collected => {
        message.delete().catch(err => 0)
        msg.edit({content:`**:x: - انتهى الوقت يُرجى المحاوله لاحقاً**`,embeds:[]})
        setTimeout( async() => {
          msg.delete().catch(err => 0)
        }, 3000)
      })
    })
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