const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const Giveaways = require('../../models/giveaway')
const giveaway = require('../../giveaway')


module.exports = {
   name: 'reroll', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: 'MANAGE_GUILD',

 async execute ( client, message, prefix, db){

try{
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
  args = args.filter(m => m !== 'reroll')
  let id = args[0]
  if(!id) return message.reply("**:x: - يُرجى وضع ايدي رسالة القيف اواي**")

  let giveawayData = await Giveaways.findOne({ messageID: id })
  if(!giveawayData) return message.reply(`**:x: - يُرجى التأكد من الايدي ، من الممكن ان وقت اعادة الفائزين انتهى**`)

  giveaway.reroll(giveawayData, message.client)

  
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