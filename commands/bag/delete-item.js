const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/bag-system")
module.exports = {
   name: 'delete-item', 
   description: '',
   aliases: ["حذف-عنصر"],
  guildOnly: true,
  cooldown: 5,
 

 async execute ( client, message, prefix, db){
if(!message.member.roles.cache.has("1040931365828427807"))return;//ايدي الرتبه
try{
  const args = message.content.split(" ")
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
let amount = args[2]
let name = args[3]

if(isNaN(amount)){
name = args[1]
amount = 2
}else if(!isNaN(amount)) {
name = args[3]
}

  
if(!name)return message.reply({content: `**:x: - يُرجى وضع اسم العنصر**`});
  
  if(!member){
message.reply({content: `**:x: - يُرجى منشن او وضع ايدي العضو**`})
 return;
  } else if(member){


let data1 = await r.findOne({guildID:message.guild.id,userID:member.id})


    if(!data1){
data1 = await r.create({
  guildID: message.guild.id,
  userID: member.id
})
      await data1.save();
}
   let items = data1.inv.filter(c => c.item.toLowerCase().includes(name.toLowerCase()))

    if(items.length <= 0)return message.reply({content: `**:x: - ليس بإمكاني ايجاد هذا العنصر , يُرجى التحقق من اسم العنصر**`});

    if(items.length == 1){
items = items.find(m => m.item == name.toLowerCase())
let data1 = await r.findOne({guildID: message.guild.id,userID:member.id})
        if(!data1){
          data1 = r.create({
            guildID: message.guild.id,
            userID:member.id
          })
          await data1.save()
        }
      
    
      let am1;

const d1 = data1.inv.find(m => m.item == items.item)


  if(d1){
am1 = data1.inv.find(m => m.item == items.item).amount
    if(am1 == amount || am1 < amount){

data1.inv.splice(data1.inv.indexOf(d1), 1)
await data1.save();
      
    } else if(am1 > amount){
data1.inv.splice(data1.inv.indexOf(d1), 1, {
     item: items.item,
     amount: Number(am1) - Number(amount)
    })
await data1.save();
    }
const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**has been deleted \`${items.item}\` \`${amount}\`**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})

let l = await n.findOne({guildID:message.guild.id,type:"bag"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bag updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${member.id}>
Actioned by: <@!${message.author.id}>
Amount:\` -${amount}\`
Reason:\` remove-item commamd (${items.name})\`**`)
.setTimestamp()
.setColor("BLUE")
    let ch1 = client.channels.cache.get(l.channelID)
      ch1.send({embeds:[embed]})
  }
  } else if(!d1){
    message.reply({content: `**:x: - العضو لايمتلك هذا العنصر**`})
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
        if(content > items.length || content === 0) return collected.first().reply(`**:x: -يُرجى وضع رقم من 1 الى ${items.length}**`)
        let item = items[content-1]

        let data1 = await r.findOne({guildID: message.guild.id,userID:member.id})
        if(!data1){
          data1 = r.create({
            guildID: message.guild.id,
            userID:member.id
          })
          await data1.save()
        }
      
      
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
    collected.first().reply({content: `**:x: - العضو لايمتلك هذا العنصر**`})
    return;
  }
  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**has been deleted \`${item.item}\` \`${amount}\`**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

        collected.first().delete().catch(err => 0)
        return msg.edit({embeds: [embed]})
        let l = await n.findOne({guildID:message.guild.id,type:"bag"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bag updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${member.id}>
Actioned by: <@!${message.author.id}>
Amount:\` -${amount}\`
Reason:\` delete-item commamd (${item.name})\`**`)
.setTimestamp()
.setColor("BLUE")
     let ch = client.channels.cache.get(l.channelID)
       ch.send({embeds:[embed]})
  }
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
  console.log(err)
  /*
message.reply({content:`**Error !**`})
message.guild.members.cache.get("931315998487887882").send({content: `New Error :

Server Name : ${message.guild.name}
Server Id : ${message.guild.id}
Error : 
\`\`\`red
${err}
\`\`\``})
*/
}
 },
};