const { CommandoClient, Command } = require('discord.js-commando');
const path = require('path');
const { Message } = require('discord.js');
const { readdirSync } = require('fs');
const message = require('./events/message');

const client = new CommandoClient({
    commandPrefix: 'misaki',
    owner: '360824982789685248'
})

client.registry
.registerDefaultTypes()
.registerGroups([
    ['ecchi', 'Only for the worthy!'],
    ['admin', 'ITS ONLY FOR ME(FUYUNA)'],
    ['annoyance', 'Hmm... Nothing?'],
    ['search', 'Search accordingly'],
    ['games', 'Well games...']
])
.registerDefaultGroups()
.registerDefaultCommands()
.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log(`It's Inside!`);
    console.log(`Currently establishing a sub-slavery as ${client.user.username}! (${client.user.id})`);
    client.user.setPresence({
        activity: {
            name: `ご主人の恋話`,
            type: 'WATCHING'
        },
        status: 'idle'
    })
    
})
// Extensions outside of commandos
for (const event of readdirSync("./events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(...args));
}


client.login(process.env.BOT_TOKEN)