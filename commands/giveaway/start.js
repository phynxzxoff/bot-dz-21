const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const giveaway = require('../../giveaway')
const ms =  require('ms')

module.exports = {
   name: 'start', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: 'MANAGE_GUILD',

 async execute ( client, message, prefix, db){

try{
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
  args = args.filter(m => m !== 'start')
  let time = args[0]
  if(!time) return message.reply(`**:x: - يُرجى وضع وقت وعدد فائزين وجائزة
مثال الاستخدام : \`${prefix}start 30m 5w Nitro\`**`)
  if(isNaN(time.replace('s', '').replace('m', '').replace('h', '').replace('d', '').replace('w', '').replace('mo', ''))) return message.reply(`**:x: - يُرجى وضع وقت : s/m/h/d/w/mo
**`)
  if(ms(time) > 1209600000) return message.reply(`**:x: - لا يمكن تجاوز اسبوعين **`)
    
  let winners = args[1]
  let prize = args.join(" ").slice(time.length + winners?.length + 2)

  if(winners && winners.toLowerCase().slice(-1) == 'w') {
	  winners = parseInt(winners.slice(0, -1))
  } else {
	  winners = 1
	  prize = args.join(" ").slice(time.length + 1)
  }
  
  giveaway.start(message, time, winners, prize)
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