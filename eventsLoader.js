const fs = require('fs');

module.exports.run = (client, dirname) => {
    fs.readdir(dirname + '/events/', (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const event = require(dirname + `/events/${file}`);
            let eventName = file.split('.')[0];
        console.log(`Loaded event: ${eventName}`)
            client.on(eventName, event.bind(client));
        });
    });
} 