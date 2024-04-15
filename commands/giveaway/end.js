const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const Giveaways = require('../../models/giveaway')
const giveaway = require('../../giveaway')


module.exports = {
   name: 'end', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: 'MANAGE_GUILD',

 async execute ( client, message, prefix, db){

try{
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let id = args[1]
  if(!id) return message.reply(`**:x: - يُرجى وضع ايدي رسالة القيف اواي**`) 

  let giveawayData = await Giveaways.findOne({ messageID: id })  
  if(!giveawayData) return message.reply("**:x: - ليس بإمكاني ايجاد هذا الايدي , يُرجى التحقق من الايدي**")

  giveaway.end(giveawayData, message.client)

  const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle(`**Giveaway has been successfully ended**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

    message.reply({embeds: [embed]}).then(msg => msg.delete({ timeout: 3000 }))

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