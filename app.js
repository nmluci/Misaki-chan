const { CommandoClient } = require('discord.js-commando');
const path = require('path');

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

client.once('ready', () => {
    console.log(`It's Inside!`);
    console.log(`Currently establishing a sub-slavery as ${client.user.username}! (${client.user.id})`);
    client.user.setActivity('ご主人様、ご精液を頂く')
})

client.login(process.env.BOT_TOKEN)