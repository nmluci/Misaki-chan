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
    ['annoyance', 'Hmm... Nothing?']
])
.registerDefaultGroups()
.registerDefaultCommands()
.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log(`It's Inside!`);
    console.log(`Currently establishing a sub-slavery as ${client.user.username}! (${client.user.id})`);
    client.user.setActivity('ご主人様、ご精液を頂く')
})
// Extensions outside of commandos
for (const event of readdirSync("./events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(...args));
}


client.login(process.env.BOT_TOKEN)
// client.login("MzcwOTI4NTI1OTE5NzgwODY2.Xlf5qQ.CB_05Vmvbn2HUbT9NHKC9SfBKWg")