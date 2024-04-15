const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const Module = require("../../schema/roles-add.js")
const modul = require("../../schema/roles-remove.js")
const save = require("../../schema/roles-save")
module.exports = {
   name: 'تفعيل', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){
if(!message.member.roles.cache.has("1057619628060323851"))return;//ايدي رتبه الي تفعل
   const args = message.content.split(" ")
const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) 

   let data = await Module.find({serverID:message.guild.id,type:"activity"})
let data1 = await modul.find({serverID:message.guild.id,type:"activity"})
//let save1 = await save.findOne({guildID:message.guild.id,memberID:member.id})


   const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setDescription(`**العضو الذي تم تفعيله : ${member}

الايدي الخاص بالعضو : ${args.slice(2).join(" ")}

تم بواسطة الاداري : ${message.author}**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")
   const embed1 = new MessageEmbed()
      .setAuthor(`**
      عزيزي المواطن : ${message.guild.name} | 👤

      لقد تم تفعيلك في سيرفر نايت لايف للحياة الواقعيه | ✅

      نتمنى منك عدم مخالفة القوانين | 🛑

      مع تحيات ادارة السيرفر | ❤
      
      **`,message.guild.iconURL({dynamic:true}))
.setDescription(`**يُرجى قراءة القوانين كامله وفهمها من أجل تجنب العقوبات والاحراجات 

 استمتع في دولة نايت لايف ${message.guild.name}**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- مفعل بواسطة : ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("WHITE")
   
try{
if(!member)return message.reply({content: `**:x: - يُرجى منشن او وضع ايدي العضو**`});
if(!args.slice(2).join(" "))return message.reply({content: `**:x: - يُرجى وضع ايدي السوني الخاص بالعضو**`})
  data.forEach(async m => {
const role = message.guild.roles.cache.get(m.roleID)
if(role) await member.roles.add(role.id)
})
  data1.forEach(async m => {
const role1 = message.guild.roles.cache.get(m.roleID)
if(role1) await member.roles.remove(role1.id)
})
  /*
if(!save1){
  save1 = await save.create({
    guildID: message.guild.id,
    memberID: member.id,
    rolesID: [1044254072355684362],
    nickname: member.displayName,
  })
}*/
await member.setNickname(`${args.slice(2).join(" ")}`)
await message.reply({embeds: [embed]})
await member.user.send({embeds:[embed1]})
} catch (err){
message.reply({content:`**__عزيزي الاداري حدث خطأ | 🚫__**`})
message.guild.members.cache.get("1044254072355684362").send({content: `New Error :

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
