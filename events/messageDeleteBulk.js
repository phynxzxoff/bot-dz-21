const Giveaways = require('../models/giveaway');

module.exports = async (messages) => {

  messages.forEach(async message => {
	let give = await Giveaways.findOne({ messageID: message.id });
	if (!give) return;
	await Giveaways.deleteOne({ messageID: message.id });
  })

}