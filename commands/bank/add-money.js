const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
const r = require("../../schema/logs")
module.exports = {
   name: 'اضافة-فلوس', 
   description: '',
   aliases: ['اضافة-فلوس'],
  guildOnly: true,
  cooldown: 5,


 async execute ( client, message, prefix, db){
if(!message.member.roles.cache.has("1057619559210811432"))return;
try{
const member = message.mentions.members.first();
if(!member)return message.reply({content:"يُرجى منشن عضو"})
const ar = message.content.split(" ")[2]
     if (!ar || isNaN(ar) || Number(ar) < 0) return message.reply({ content: `يُرجى وضع رقم صالح !` });
if(member){
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
  data.bank += Number(ar);
    await data.save();

const embed1 = new MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**__ : عزيزي موظف البنك : ${message.author} |<:pp440:1057635673420615821>

<:emoji_8:1057626985825837086> | تم اضافة ${ar}$ بنجاح

<:pp292:1057635421917556776> | المواطن : <@!${member.id}>

💸  | وزارة المالية
 <:pp971:1057636027134644235> | بنك البلاد__**`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setImage(`https://media.discordapp.net/attachments/944333617855885327/952610346227617842/d955c5ff7741a5c7.jpg`)
.setColor(`#D69600`)
message.reply({embeds:[embed1]})

let l = await r.findOne({guildID:message.guild.id,type:"bank"})
  if(l){
  const embed = new MessageEmbed()
      .setAuthor("Bank updated",message.guild.iconURL({dynamic:true}))
.setDescription(`**User: <@!${member.id}>
Actioned by: <@!${message.author.id}>
Amount:\` +${ar}\`
Reason:\` add-money commamd\`**`)
.setTimestamp()
.setColor("GREEN")

    message.guild.channels.cache.get(l.channelID).send({embeds:[embed]})
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