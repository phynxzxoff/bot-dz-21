const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/replys.js")
module.exports = {
   name: 'create-word', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: "ADMINISTRATOR",

 async execute ( client, message, prefix, db){

try{
  const args = message.content.split(" ").slice(3).join(" ")
  const args1 = message.content.split(" ")

  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args1[1])
const channel = message.mentions.channels.first() || message.guild.channels.catch.get(args1[2])
if(!role)return message.reply({content: `**:x: - يُرجى منشن او وضع ايدي الرول**`})
if(!channel)return message.reply({content: `**:x: - يُرجى منشن او وضع ايدي الشات**`})
if(!args)return message.reply({content: `**:x: - يُرجى وضع الكلمة**`});

  function id() {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

let reply = await r.findOne({guildID:message.guild.id,word:args})
const idd = id()
if(!reply){ 
reply = await r.create({
  guildID: message.guild.id,
  roleID: role.id,
  channelID: channel.id,
  ID: idd,
  word: args
})
  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**The word has been created successfully, the word ID is \`${idd}\`, to add a reply to the word please type -add-reply [ Reply ID ] [ Reply ]**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]})

reply.save();
  
}else if(reply){
message.reply({content:`**:x: - الكلمة هذه مضافة بالفعل**`})
  return;
}

  
} catch (err){
message.reply({content:`**Error !**`})
message.guild.members.cache.get("816336815606071316").send({content: `New Error :

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