let Giveaways = require('../models/giveaway')
let giveaway = require('../giveaway')
const ms = require('ms')

module.exports = async (client) => {
  console.log("hi")
const mySecret = process.env['token']
  let giveaways = await Giveaways.find({})
  giveaways.forEach(async data => {
	let time = new Date().getTime()
	if(data.ended) {
      if((data.time - time) + ms('30m') < 0) {
		await Giveaways.deleteOne({ messageID: data.messageID })
	  } else {
	    setTimeout(async () => {
		  await Giveaways.deleteOne({ messageID: data.messageID })
		}, (data.time - time) + ms('30m'))
	  }
	} else {
	  if(data.time - time < 0) {
	    giveaway.end(data, client)
	  } else {
	    setTimeout(() => {
	  	  giveaway.end(data, client)
	    }, data.time - time)
	  }
	}
  })
}