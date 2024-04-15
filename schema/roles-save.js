const mongoose = require("mongoose");

const members = new mongoose.Schema({
   guildID: String,
   memberID: String,
   rolesID: String,
   nickname: String
});

const model = mongoose.model("roles-save", members);

module.exports = model;  
