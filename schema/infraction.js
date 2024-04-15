const { Schema, model } = require("mongoose");

const pp = new Schema({
  guildID: String,
  userID: String,
  inf: { type: Array, default: [] }
})

module.exports = model("infraction", pp); 
 