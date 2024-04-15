
const fs = require('fs');

module.exports = (client) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

//events > messageCreate.js

//const { PREFIX } = require('../JSON/config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (!message.content.startsWith(PREFIX) || message.author.bot) return;
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        try {
            let commandFiles = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            if (!commandFiles) return;
            commandFiles.execute(client, message, args)
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    },
};

//events > ready.js

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}\n`);
    },
};

//test.js

module.exports = {
    name: 'test',
    execute(client, message, args) {
        
        // احذف السطر هذا وحط الكود حقك

    }
}
