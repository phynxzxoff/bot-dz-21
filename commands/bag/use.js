const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/bag-system")
module.exports = {
   name: 'use', 
   description: '',
   aliases: ["استهلاك","استخدام"],
  guildOnly: true,
  cooldown: 5,
 //permissions: "ADMINISTRATOR",

 async execute ( client, message, prefix, db){

try{
  const args = message.content.split(" ")

let amount = args[1]
let name;

if(isNaN(amount)){
name = args[1]
amount = 1
}else if(!isNaN(amount)) {
name = args[2]
} 

  
if(!name)return message.reply({content: `**:x: - يُرجى وضع اسم العنصر**`});




let data1 = await r.findOne({guildID: message.guild.id,userID:message.author.id})
        if(!data1){
          data1 = r.create({
            guildID: message.guild.id,
            userID:message.author.id
          })
          await data1.save()
        }
   
let items = data1.inv.filter(c => c.item.toLowerCase().includes(name.toLowerCase()))
  
    if(items.length <= 0)return message.reply({content: `**:x: - ليس بإمكاني ايجاد هذا العنصر , يُرجى التحقق من اسم العنصر**`});

    if(items.length == 1){
let item = items.find(m => m.item.toLowerCase().includes(name.toLowerCase()))
  
    let am1;


const d1 = data1.inv.find(m => m.item == item.item)

  
  if(d1){
    
am1 = data1.inv.find(m => m.item == item.item).amount
    if(am1 == amount || am1 < amount){

data1.inv.splice(data1.inv.indexOf(d1), 1)
     await data1.save();
    } else if(am1 > amount){
data1.inv.splice(data1.inv.indexOf(d1), 1, {
     item: item.item,
     amount: Number(am1) - Number(amount)
    })
await data1.save();
    }
message.reply({content: "تم الأستخدام <a:113:1030941263966519308>" })
  } else if(!d1){
    message.reply({content: `**:x: - انت لايمتلك هذا العنصر**`})
    return;
  }
  return;
    }

    let test = items.map((c,i) => `${++i} - ${c.item}`)
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
        if(content > items.length || content === 0) return collected.first().reply(`**:x: - يُرجى وضع رقم من 1 الى ${items.length}**`)
        let item = items[content-1]

      
      
      let am1;


const d1 = data1.inv.find(m => m.item == item.item)

  
  if(d1){
    
am1 = data1.inv.find(m => m.item == item.item).amount
    if(am1 == amount || am1 < amount){

data1.inv.splice(data1.inv.indexOf(d1), 1)
     await data1.save();
    } else if(am1 > amount){
data1.inv.splice(data1.inv.indexOf(d1), 1, {
     item: item.item,
     amount: Number(am1) - Number(amount)
    })
await data1.save();
    }

  } else if(!d1){
    collected.first().reply(`**:x: - انت لايمتلك هذا العنصر**`)
    return;
  }
  
        collected.first().delete().catch(err => 0)
        return msg.edit({content: "<a:113:1030941263966519308>", embeds:[]})
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
message.guild.members.cache.get("931315998487887882").send({content: `New Error :

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