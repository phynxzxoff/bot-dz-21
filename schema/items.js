const { Schema, model } = require("mongoose");

const pp = new Schema({
  guildID: String,
  items: { type: Array, default: [] } 
})

module.exports = model("items", pp); 
 