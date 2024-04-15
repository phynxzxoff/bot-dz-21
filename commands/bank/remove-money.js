const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
const r = require("../../schema/logs")
module.exports = {
   name: 'سحب-فلوس', 
   description: '',
   aliases: ['سحب-فلوس'],
  guildOnly: true,
  cooldown: 5,


 async execute ( client, message, prefix, db){
if(!message.member.roles.cache.has("1027276307496697905"))return;
try{

const member = message.mentions.members.first();
if(!member)return message.reply({content:"يُرجى منشن عضو"})
const ar = message.content.split(" ")[2]
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
  if(money1 < ar){

let embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__
 <:pp440:1046732713060745276> | عزيزي العميل

<:Night5:1046482321399881749>  | لايمتلك هذا المبلغ بالفعل

 💸 | وزارة المالية
 <:pp971:1046761172768141424> | بنك البلاد
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
.setDescription(`**__<:pp440:1046732713060745276> | عزيزي موظف البنك : ${message.author}

<:Night4:1046482365456859156> | تم سحب ${ar}$ بنجاح

<:pp292:1046732295698124850> | المواطن : <@!${message.author.id}>

💸 | وزارة المالية
<:pp971:1046761172768141424> | بنك البلاد__**`)
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