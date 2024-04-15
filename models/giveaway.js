const { Schema, model } = require('mongoose')

let giveaway = Schema({
  guildID: String,
  channelID: String,
  messageID: String,
  prize: String,
  winners: Number,
  time: Number,
  owner: String,
  ended: { type: Boolean, default: false },
})

module.exports = model('Giveaway', giveaway);