const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const Giveaways = require('../../models/giveaway')
const giveaway = require('../../giveaway')
const count = 3
module.exports = {
   name: 'list', 
   description: '',
   aliases: [''],
  guildOnly: true,
  cooldown: 5,
 permissions: 'MANAGE_GUILD',

 async execute ( client, message, prefix, db){

try{
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg1 = await message.reply("Please wait...")
  let giveaways = await Giveaways.find({guildID:message.guild.id})
  let emoji = await giveaway.getEmoji(message)
  
  if(giveaways.filter(m => !m.ended).length == 0) return msg.edit("💥 There are no giveaways running on the server!")

  let embeds = []
  
  let map = giveaways.map((data,i)=>
    `#${i+1}
> \`Message:\` [Jump To Message](https://discord.com/channels/${data.guildID}/${data.channelID}/${data.messageID})
> \`Channel:\` <#${data.channelID}>
> \`ID:\` ${data.messageID}
> \`Owner:\` <@!${data.owner}>
> \`Winners:\` ${data.winners > 1 ? "s" : ""}
> \`Prize:\` ${data.prize !== undefined ? data.prize : "No prize specified" }
> \`End in:\` <t:${data.time.toString().slice(0,10)}:R>`)

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
    if(embeds.length === 1) return msg1.edit({ embeds: [ embeds[page] ] });
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