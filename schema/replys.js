const { Schema, model } = require("mongoose");

const pp = new Schema({
  guildID: String,
  roleID: String,
  channelID: String,
  ID: String,
  word: String,
  replys: { type: Array, default: [] } 
})

module.exports = model("replys", pp); 
 