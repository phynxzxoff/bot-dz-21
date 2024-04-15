const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const r = require("../../schema/items")
const count = 10
module.exports = {
   name: 'store', 
   description: '',
   aliases: ["المتجر","الشوب"],
  guildOnly: true,
  cooldown: 5,
 ///permissions: 'KICK_MEMBERS',

 async execute ( client, message, prefix, db){

try{
const data = await r.findOne({guildID:message.guild.id})
  let array = [];
  let embeds = [];

    let map = data.items.map((d, b) => `**${d.price}$ - ${d.name}\n\n**`);
    if(!map.length)return message.reply({content: `**The market is completely empty**`})
    let k = count;
    for(let i = 0; i < map.length; i+=count) {
      let array = map.slice(i, k);
      let embed = new MessageEmbed()
        .setColor(message.guild.me.roles.highest.hexColor)
        .setAuthor(`${message.guild.name} Store`,message.guild.iconURL({ dynamic: true }))
        .setDescription(array.join("\n"));
      embeds.push(embed);
      k += count;
    }
    let page = 0;
    embeds[page].setFooter({ text: `Page ${page + 1}/${embeds.length}` });
    if(embeds.length === 1) return message.channel.send({ embeds: [ embeds[page] ] });
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
    message.channel.send({ embeds: [ embeds[page] ], components: [row] }).then(async msg => {
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