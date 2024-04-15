const mongoose = require("mongoose");

const members = new mongoose.Schema({
   serverID: String,
   roleID: String,
   type: String
});

const model = mongoose.model("roles-remove", members);

module.exports = model;  
