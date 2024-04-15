const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
const r = require("../../schema/logs")
module.exports = {
   name: 'مخالفة', 
   description: '',
   aliases: ['مخالفة',"مخالفه"],
  guildOnly: true,
  cooldown: 5,
 returnrole: "1057619698805649458",

 async execute ( client, message, prefix, db){

try{

const member = message.mentions.members.first();
if(!member)return message.reply({content:"يُرجى منشن عضو"})
const ar = message.content.split(" ")[2]
const args = message.content.split(" ").slice(3).join(" ")
     if(!ar || isNaN(ar) || Number(ar) < 0) return message.reply({ content: `يُرجى وضع رقم صالح !` });
if(member && ar){
  
let data = await money.findOne({
  guildID: message.guild.id,
  userID: member.id
});
if(!data){
data = await money.create({
  guildID: message.guild.id,
  userID: member.id
});
  await data.save();
} 
const money1 = data.bank + data.cash
  //if(money1 < ar){
  console.log(data)
  //message.reply(args)
  if(!ar) {
let embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__
  <:pp584:1057680043444285440> | عزيزي رجل الأمن

  <:emoji_9:1057627213782057040> | لايمتلك هذا المبلغ بالفعل

 💸 | وزارة المالية
  <:pp971:1057636027134644235> | بنك البلاد
__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`) 


message.channel.send({embeds: [embed1]});
} else {

    const n = ar - data.cash
    const n1 = ar - n
    if(n === 0){
    data.cash -= Number(ar);
    await data.save();
    }else if(n > 0){
      data.cash -= Number(n1)
    await data.save();
      data.bank -= Number(n);
    await data.save();
      
    }
let embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__ <:pp584:1057680043444285440> | عزيزي رجل الأمن : ${message.author}

<:emoji_8:1057626985825837086> | لقد تم مخالفة المواطن بمبلغ ${ar}$ 

<:pp584:1057680043444285440> | رجل الأمن : <@!${message.author.id}>

<:pp108:1057635098515742761> | سبب المخالفة : ${args}

💸 | وزارة المالية
<:pp971:1057636027134644235> | بنك البلاد__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`) 


message.channel.send({embeds: [embed1]});
    let l = await r.findOne({guildID:message.guild.id,type:"bank"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bank updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${member.id}>
Actioned by: <@!${message.author.id}>
Amount:\` -${ar}\`
Reason:\` remove-money commamd\`**`)
.setTimestamp()
.setColor("RED")

    message.guild.channels.cache.get(l.channelID).send({embeds:[embed]})
  }
}
}
  
} catch (err){
  console.log(err)
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