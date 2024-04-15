const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const ms = require("ms")

module.exports = {
   name: 'set-activity', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: 'ADMINISTRATOR',

 async execute ( client, message, prefix, db){
let activity = message.content.split(" ").slice(1).join(" ")
  
   if(!activity){
     message.reply({content: `**:x: - حط حاله البوت**`})
return;
}

const row = new MessageActionRow()
        .addComponents(new MessageSelectMenu().setCustomId('activity').setPlaceholder('Click to view Help Menu').addOptions([
                  {
                        label: 'Playing',
                        description: 'اضغط هنا لتغيير حالة البوت لي Playing',
                        value: 'playing',
                 emoji:'1️⃣'    
                    }, {
                        label: 'Streaming',
                        description: 'اضغط هنا لتغيير حالة البوت لي Streaming',
                        value: 'streaming',
                 emoji:'2️⃣'    
                    }, {
                        label: 'Listening',
                        description: 'اضغط هنا لتغيير حالة البوت لي Listening',
                        value: 'listening',
                 emoji:'3️⃣'    
                    }, {
                        label: 'Watching',
                        description: 'اضغط هنا لتغيير حالة البوت لي Watching',
                        value: 'watching',
                 emoji:'4️⃣'    
                    }, {
                        label: 'Competing',
                        description: 'اضغط هنا لتغيير حالة البوت لي Competing',
                        value: 'competing',
                 emoji:'5️⃣'    
                    }
]),
);

      const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**See the types of activities below, and set up the bot activity now**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor(message.guild.me.roles.highest.hexColor)
try{
        await message.reply({ embeds:[embed], components: [row] })
await db.set(`activity`,activity)
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