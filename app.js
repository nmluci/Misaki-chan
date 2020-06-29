const { CommandoClient, Command } = require('discord.js-commando');
const path = require('path');
const { Message } = require('discord.js');
const { readdirSync } = require('fs');

const client = new CommandoClient({
    commandPrefix: 'misaki',
    owner: '360824982789685248'
})

client.registry
.registerDefaultTypes()
.registerGroups([
    ['ecchi', 'Ecchi'],
    ['admin', 'Admin only'],
    ['annoyance', 'Annoyance :V'],
    ['search', 'Search'],
    ['games', 'Games']
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
            type: 'LISTENING'
        },
        status: 'idle'
    })
    
})

// Extensions outside of commandos
for (const event of readdirSync("./events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(...args));
}


client.login(process.env.BOT_TOKEN)
// client.login('MzcwOTI4NTI1OTE5NzgwODY2.XvdCdA.P5x5cbTTwiAa_Z-TexTKUg1LBO8')