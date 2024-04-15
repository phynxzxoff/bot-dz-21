const mongoose = require("mongoose");

const members = new mongoose.Schema({
   guildID: String,
   channelID: String,
});

const model = mongoose.model("channel-log", members);

module.exports = model;  
