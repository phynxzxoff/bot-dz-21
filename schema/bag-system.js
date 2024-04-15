const { Schema, model } = require("mongoose");

const pp = new Schema({
  guildID: String,
  userID: String,
  inv: { type: Array, default: [] } 
})

module.exports = model("inventory", pp); 
 