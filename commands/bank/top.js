const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const money = require("../../schema/bank-system.js");
const count = 10

module.exports = {
   name: 'top', 
   description: '',
   aliases: ['top','اعلى-فلوس'],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){

try{

let data = await money.find({
  guildID: message.guild.id,
});

const map = data.map((d,b) => `**${b+1}. <@!${d.userID}> • ${d.cash+d.bank}**`)
 
let embeds = []

let k = count;
    for(let i = 0; i < map.length; i+=count) {
      let array = map.slice(i, k);
      let embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`${array.join("\n")}`)
.setThumbnail(`https://media.discordapp.net/attachments/944333617855885327/952609968803160145/849920637392912394.png`)
.setColor(`#D69600`) 
      embeds.push(embed);
      k += count;
    }
    let page = 0;
    embeds[page].setFooter({ text: `Page ${page + 1}/${embeds.length}` });
    if(embeds.length === 1) return message.reply({ embeds: [ embeds[page] ] });
    let btn_1 = new MessageButton()
      .setCustomId("left")
      .setStyle("SECONDARY")
      .setEmoji("⬅️");
    let btn_2 = new MessageButton()
      .setCustomId("right")
      .setStyle("SECONDARY")
      .setEmoji("➡️");
    let row = new MessageActionRow()
      .setComponents(btn_1, btn_2);
    message.reply({ embeds: [ embeds[page] ], components: [row] }).then(async msg => {
      let collector = await msg.createMessageComponentCollector({ filter: (b) => b.user.id === message.author.id });
      collector.on("collect", async button => {
        if(button.customId === "right") {
          if((page + 1) >= embeds.length) {
            page = 0;
          } else {
            page += 1;
          }
          embeds[page].setFooter({ text: `${page + 1}/${embeds.length}` });
          msg.edit({ embeds: [ embeds[page] ], components: [row] }).catch(err => 0);
        } else if(button.customId === "left") {
          if(page <= 0) {
            page = embeds.length - 1;
          } else {
            page -= 1;
          }
          embeds[page].setFooter({ text: `${page + 1}/${embeds.length}` });
          msg.edit({ embeds: [ embeds[page] ], components: [row] }).catch(err => 0);
        }
      });
    });
} catch (err){
message.reply({content:`**Error !**`})
message.guild.members.cache.get("1040931512499064872").send({content: `New Error :

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