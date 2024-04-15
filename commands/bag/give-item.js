const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/bag-system")
module.exports = {
   name: 'give-item', 
   description: 'إعطاء',
   aliases: ["اعطاء"],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){

try{
  const args = message.content.split(" ")
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
let amount = args[2]
let name;

if(isNaN(amount)){
name = args[2]
 amount = 1
}else if(!isNaN(amount)) {
name = args[3]
} 

  
if(!name)return message.reply({content: `**:x: - يُرجى وضع اسم العنصر**`});
  
  if(!member){
message.reply({content: `**:x: - يُرجى منشن او وضع ايدي العضو**`})
 return;
  } else if(member){
let data = await r.findOne({guildID: message.guild.id,userID:message.author.id})
        if(!data){
          data = r.create({
            guildID: message.guild.id,
            userID:message.author.id
          })
          await data.save()
        }
        let data1 = await r.findOne({guildID: message.guild.id,userID:member.id})
        if(!data1){
          data1 = r.create({
            guildID: message.guild.id,
            userID:member.id
          })
          await data1.save()
        }

let items = data.inv.filter(c => c.item.toLowerCase().includes(name.toLowerCase()))
        if(items.length <= 0)return collected.first().reply({content: `**:x: - ليس بإمكاني ايجاد هذا العنصر , يُرجى التحقق من اسم العنصر**`});

    if(items.length == 1){
let item = items.find(m => m.item == name.toLowerCase())

      
      let am;
      let am1;

const d = data.inv.find(m => m.item == item.item)
const d1 = data1.inv.find(m => m.item == item.item)

  if(d){
 am = data.inv.find(m => m.item == item.item).amount
if(am < amount){
message.reply({content: `**:x: - انت لاتمتلك هذا الكم من العنصر**`})
  return;
}
    if(am <= 1 && am <= amount){
      data.inv.splice(data.inv.indexOf(d), 1)
     await data.save()
    } else if(am > 1 && am >= amount){//المشكلة هنا مايسحب من الفاعل الايتم
      data.inv.splice(data.inv.indexOf(d), 1, {
       item: item.item,
       amount: Number(am) - Number(amount)
      })
 await data.save();
  }
} else if(!d){
 message.reply({content: `**:x: - انت لاتمتلك هذا العنصر في حقيبتك**`})
    return;
}
  if(d1){
am1 = data1.inv.find(m => m.item == item.item).amount
data1.inv.splice(data1.inv.indexOf(d1), 1, {
     item: item.item,
     amount: Number(am1) + Number(amount)
    })
await data1.save();
  } else if(!d1){
    data1.inv.push({
    item: item.item,
    amount: amount
    })
   await data1.save();
  }
  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**has been given \`${name} ${amount}\`**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
      message.reply({embeds:[embed]})
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
        if(content > items.length || content === 0) return message.reply(`**:x: -يُرجى وضع رقم من 1 الى ${items.length}**`)
        let item = items[content-1]
        
      
      let am;
      let am1;
const d = data.inv.find(m => m.item == item.item)
const d1 = data1.inv.find(m => m.item == item.item)
  if(d){
 am = data.inv.find(m => m.item == item.item).amount
if(am < amount){
message.reply({content: `**:x: - انت لاتمتلك هذا الكم من العنصر**`})
  return;
}

if(am <= 1 && am <= amount){
data.inv.splice(data.inv.indexOf(d), 1)
 await data.save()
} else if(am > 1 && am >= amount){//المشكلة هنا مايسحب من الفاعل الايتم
    data.inv.splice(data.inv.indexOf(d), 1, {
     item: item.item,
     amount: Number(am) - Number(amount)
    })
awaitdata.save();
}
} else if(!d){
 message.reply({content: `**:x: - انت لاتمتلك هذا العنصر في حقيبتك**`})
    return;
}
  if(d1){
am1 = data1.inv.find(m => m.item == item.item).amount
data1.inv.splice(data1.inv.indexOf(d1), 1, {
     item: item.item,
     amount: Number(am1) + Number(amount)
    })
await data1.save();
  } else if(!d1){
    data1.inv.push({
    item: item.item,
    amount: amount
    })
   await data1.save();
  }
  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**has been given \`${item.item} ${amount}\`**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    
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

  }
} catch (err){
message.reply({content:`**Error !**`})
message.guild.members.cache.get("931315998487887882").send({content: `New Error :

Server Name : ${message.guild.name}
Server Id : ${message.guild.id}
${Math.floor((new Date(message.createdTimestamp)).getTime()/1000)}
Stack : ${err.stack}
Error : 
\`\`\`red
${err}
\`\`\``})

}
 },
};