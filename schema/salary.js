const { Schema, model } = require("mongoose");

const pp = new Schema({
  guildID: String,
  roleID: String,
  salary: Number
})

module.exports = model("salarys", pp); 
 