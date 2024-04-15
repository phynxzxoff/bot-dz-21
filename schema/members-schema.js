const mongoose = require("mongoose");

const members = new mongoose.Schema({
   serverID: String,
   roleID: String,
   memberID: String
});

const model = mongoose.model("members1Schemal", members);

module.exports = model; 
