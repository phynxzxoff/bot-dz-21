const mongoose = require("mongoose");

const members = new mongoose.Schema({
   guildID: String,
   channelID: String,
   type: String
});

const model = mongoose.model("logs", members);

module.exports = model;  
