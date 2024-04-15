const { Schema, model } = require('mongoose')

let guild = Schema({
  id: String,
  reaction: { type: String, default: '🎉' },
  banner: String
})

module.exports = model('Guild', guild);