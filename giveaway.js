const Giveaways = require('./models/giveaway')
const Discord = require('discord.js')
const Guild = require('./models/guild')
const ms = require('ms')

async function start(message, time, winners, prize) {
  let msTime = new Date().getTime() + ms(time)
  let emoji = await getEmoji(message.guild)
  let guild = await Guild.findOne({ id: message.guild.id })

  let embed = new Discord.MessageEmbed()
  .setDescription(`React with ${emoji.emoji} to enter!\nEnds: <t:${msTime.toString().slice(0,10)}:R> (<t:${msTime.toString().slice(0,10)}:F>)\nHosted by: ${message.author}`)
  .setColor("#ffd700")
  .setFooter({ text: `Ends at` })
  .setTimestamp(Date.now() + ms(time))

  if(guild?.banner) {
    embed.setImage(guild.banner)
  }

  if(prize.length > 0) embed.setTitle(prize)
  
  message.delete()
  message.channel.send({ content: `**${emoji.emoji} GIVEAWAY STARTED ${emoji.emoji}**`, embeds: [embed] }).then(msg => {
	  msg.react(emoji.custom ? emoji.id : emoji.emoji)
	  new Giveaways({
	    guildID: message.guild.id,
	    channelID: message.channel.id,
	    messageID: msg.id,
	    prize: prize ? prize : "",
	    winners: winners,
	    time: msTime,
	    owner: message.author.id
	  }).save()
	  setTimeout(async () => {
	    let giveaway = await Giveaways.findOne({ messageID: msg.id })
      if(!giveaway) return;
	    await end(giveaway, message.client)
	  }, ms(time) - 1000)
  })
}

async function end(giveaway, client) {
  let channel = client.channels.cache.get(giveaway.channelID)
  let message = await channel?.messages.fetch(giveaway.messageID)
  if(!message) return;

  let emoji = await getEmoji(message.guild)

  let reaction = await message.reactions?.cache.get(emoji.custom ? emoji.id : emoji.emoji)
  let winners = await reaction?.users.fetch().then(m => m.filter(h => !h.bot).random(giveaway.winners))

  let embed = new Discord.MessageEmbed()
  .setColor("#ffd700")

  if(winners?.length > 0) {
	  embed.setDescription(`Winner${giveaway.winners > 1 ? "s" : ""}: ${winners}\nHosted by: <@${giveaway.owner}>`)
  } else {
	  embed.setDescription(`Not enough entrants to determine a winner!\nHosted by: <@${giveaway.owner}>`)
  }

  if(giveaway.prize.length > 0) {
	  embed.setTitle(giveaway.prize)
  }

  let c = await reaction?.users.fetch().then(m => m.filter(h => !h.bot).size)

  let e = new Discord.MessageEmbed()
  .setDescription(`**${c}** entrants [↗](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})`)

  message.edit({ content: `**${emoji.emoji} GIVEAWAY ENDED ${emoji.emoji}**`, embeds: [embed] })
  channel.send({ content: winners ? winners.length > 0 ? `Congratulations ${winners}! You won${giveaway.prize.length > 0 ? ` **${giveaway.prize}**` : ""}!` : 'No valid entrants, so a winner could not be determined!' : 'I can\' find winners for this giveaway', embeds: [e] })

  giveaway.ended = true
  giveaway.save()

  setTimeout(async () => {
    await Giveaways.deleteOne({ messageID: giveaway.messageID }).catch(err => {})
  }, ms("30m"))
}

async function reroll(giveaway, client) {
  let channel = client.channels.cache.get(giveaway.channelID)
  let message = await channel.messages.fetch(giveaway.messageID)
  if(!message) return;

  let emoji = await getEmoji(message.guild)

  let reaction = await message.reactions?.cache.get(emoji.custom ? emoji.id : emoji.emoji)
  let winners = await reaction?.users.fetch().then(m => m.filter(h => !h.bot).random(giveaway.winners))

  channel.send({ content: winners?.length > 0 ? `Congratulations ${winners}! You won${giveaway.prize.length > 0 ? ` **${giveaway.prize}**` : ""}!` : 'No valid entrants, so a winner could not be determined!' })
}

async function getEmoji(guild) {
  let guildData = await Guild.findOne({ id: guild.id })
  if(!guildData) return { custom: false, emoji: '🎉' }
  let emoji = guild.emojis.cache.find(e => e.id === guildData.reaction)
  if(!emoji) return { custom: false, emoji: '🎉' }
  return { custom: true, id: emoji.id, name: emoji.name, emoji }
}

module.exports = { start, end, reroll, getEmoji }