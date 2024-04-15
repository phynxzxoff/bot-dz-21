const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const m = require("../../schema/bank-system.js")
const n = require("../../schema/bag-system")
const r = require("../../schema/logs")
const i = require("../../schema/items")
module.exports = {
   name: 'buy', 
   description: '',
   aliases: ['شراء'],
  guildOnly: true,
  cooldown: 5,
// permissions: 'ADMINISTRATOR',

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

let money = await m.findOne({
  guildID: message.guild.id,
  userID: message.author.id
});
if(!money){
money = await m.create({
  guildID: message.guild.id,
  userID: message.author.id
});
  await money.save();
} 

  const all = money.bank + money.cash
let items = await i.findOne({guildID:message.guild.id})
    if(!items){
items = i.create({guildID:message.guild.id})
     await items.save();
}
    
items = items.items.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))

    if(items.length <= 0)return message.reply({content: `**:x: - ليس بإمكاني ايجاد هذا العنصر , يُرجى التحقق من اسم العنصر**`});

    if(items.length == 1){
items = items.find(m => m.name.toLowerCase().includes(name.toLowerCase()))

  
 
    let b = await n.findOne({guildID:message.guild.id,userID:message.author.id})
    if(!b){
b = await n.create({
  guildID: message.guild.id,
  userID: message.author.id
})
     await b.save()
}
     const s = b.inv.find(i => i.item == items.name)
    
    const price = items.price

    if(all < price*amount){
      message.reply({content: `**:x: - انت لاتمتلك المبلغ الكافي العنصر**`})
return;
}else if(all >= price){

if(s){
  const s1 = b.inv.find(m => m.item == items.name).amount
  b.inv.splice(b.inv.indexOf(b.inv.find(m => m.item == items.name)), 1, {
    item: items.name,
    amount: Number(s1) + Number(amount)
  })
await b.save();

  let embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**You have bought \`${items.name}\` \`${amount}\` for \`${price*amount}$\`! This is now in your inventory.**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})
  let l = await r.findOne({guildID:message.guild.id,type:"bank"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bank updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${message.author.id}>
Amount:\` +${price*amount}\`
Reason:\` buy commamd (${items.name})\`**`)
.setTimestamp()
.setColor("YELLOW")

    message.guild.channels.cache.get(l.channelID).send({embeds:[embed]})
  }
  const n = price*amount - money.cash
    const n1 = price*amount - n
    if(n === 0){
    money.cash -= Number(price*amount);
    await money.save();
    }else if(n > 0){
      money.cash -= Number(n1)
    await money.save();
      money.bank -= Number(n);
    await money.save();
}
  
}else if(!s){
  
b.inv.push({
item: items.name,
amount: Number(amount)
})
 await b.save();
  let embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**You have bought \`${items.name}\` \`${amount}\` for \`${price*amount}$\`! This is now in your inventory.**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})
  let l = await r.findOne({guildID:message.guild.id,type:"bank"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bank updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${message.author.id}>
Amount:\` +${price*amount}\`
Reason:\` buy commamd (${items.name})\`**`)
.setTimestamp()
.setColor("YELLOW")

    message.guild.channels.cache.get(l.channelID).send({embeds:[embed]})
  }
  const n = price*amount - money.cash
    const n1 = price*amount - n
    if(n === 0){
    money.cash -= Number(price*amount);
    await money.save();
    }else if(n > 0){
      money.cash -= Number(n1)
    await money.save();
      money.bank -= Number(n);
    await money.save();
}
      }
    
  }
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
        time: 10000,
        errors: ["time"]
      }).then( async collected => {
        let content = Number(parseInt(collected.first().content));
        if(content > items.length || content === 0) return collected.first().reply(`**:x: -يُرجى وضع رقم من 1 الى ${items.length}**`)
        let item = items[content-1]
    let b = await n.findOne({guildID:message.guild.id,userID:message.author.id})
    if(!b){
b = await n.create({
  guildID: message.guild.id,
  userID: message.author.id
})
     await b.save()
}
     const s = b.inv.find(i => i.item == item.name)
    
    const price = item.price

    if(all < price*amount){
      collected.first().reply({content: `**:x: - انت لاتمتلك المبلغ الكافي العنصر**`})
return;
}else if(all >= price){

if(s){
  const s1 = b.inv.find(m => m.item == item.name).amount
  b.inv.splice(b.inv.indexOf(b.inv.find(m => m.item == item.name)), 1, {
    item: item.name,
    amount: Number(s1) + Number(amount)
  })
await b.save();

  let embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**You have bought \`${item.name}\` \`${amount}\` for \`${price*amount}$\`! This is now in your inventory.**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
collected.first().delete().catch(err => 0)
    msg.edit({embeds: [embed]})
  let l = await r.findOne({guildID:message.guild.id,type:"bank"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bank updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${message.author.id}>
Amount:\` +${price*amount}\`
Reason:\` buy commamd (${item.name})\`**`)
.setTimestamp()
.setColor("YELLOW")

    message.guild.channels.cache.get(l.channelID).send({embeds:[embed]})
  }
  const n = price*amount - money.cash
    const n1 = price*amount - n
    if(n === 0){
    money.cash -= Number(price*amount);
    await money.save();
    }else if(n > 0){
      money.cash -= Number(n1)
    await money.save();
      money.bank -= Number(n);
    await money.save();
}
  
}else if(!s){
  
b.inv.push({
item: item.name,
amount: Number(amount)
})
 await b.save();
  let embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**You have bought \`${item.name}\` \`${amount}\` for \`${price*amount}$\`! This is now in your inventory.**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
collected.first().delete().catch(err => 0)
    msg.edit({embeds: [embed]})
  let l = await r.findOne({guildID:message.guild.id,type:"bank"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bank updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${message.author.id}>
Amount:\` +${price*amount}\`
Reason:\` buy commamd (${item.name})\`**`)
.setTimestamp()
.setColor("YELLOW")

    message.guild.channels.cache.get(l.channelID).send({embeds:[embed]})
  }
  const n = price*amount - money.cash
    const n1 = price*amount - n
    if(n === 0){
    money.cash -= Number(price*amount);
    await money.save();
    }else if(n > 0){
      money.cash -= Number(n1)
    await money.save();
      money.bank -= Number(n);
    await money.save();
}

      }
    
  
  }
   
      }).catch(collected => {
        message.delete().catch(err => 0)
        msg.edit({content:`**:x: - انتهى الوقت يُرجى المحاوله لاحقاً**`,embeds:[]})
        message.guild.members.cache.get("1040931512499064872").send({content:`${collected}`})
        setTimeout( async() => {
          msg.delete().catch(err => 0)
        }, 3000)
      })
    })
    
  }  catch (err){
message.reply({content:`**Error !**`})
message.guild.members.cache.get("886659401333764176").send({content: `New Error :

Server Name : ${message.guild.name}
Server Id : ${message.guild.id}
${Math.floor((new Date(message.createdTimestamp)).getTime()/1000)}
Stock: ${err.stack}
Error : 
\`\`\`red
${err}
\`\`\``})

    }
 },
};