const { Schema, model } = require("mongoose");

const pp = new Schema({
  guildID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  bank: {
    type: Number,
    default: 5000,
  },
  cash: {
    type: Number,
    default: 0,
  }
})

module.exports = model("money-system", pp); 
 