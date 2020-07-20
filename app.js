const { CommandoClient, Command } = require('discord.js-commando');
const { tsundere, deredere, slave, ero} = require('./libs/Personality')
const path = require('path');
const { readdirSync } = require('fs');
const client = new CommandoClient({
    commandPrefix: 'fyn',
    owner: '360824982789685248'
})
let masterGuild

client.registry
.registerDefaultTypes()
.registerGroups([
    ['ecchi', 'Ecchi'],
    ['admin', 'Admin only'],
    ['annoyance', 'Annoyance'],
    ['search', 'Search'],
    ['games', 'Games'],
    ['waifu', 'Waifu-ing ME!']
])
.registerDefaultGroups()
.registerDefaultCommands()
.registerCommandsIn(path.join(__dirname, 'commands'));

// client.on('ready', () => {
//     console.log(`It's Inside!`);
//     console.log(`Currently establishing a sub-slavery as ${client.user.username}! (${client.user.id})`);
//     client.user.setPresence({
//         activity: {
//             name: `ご主人の恋話`,
//             type: 'LISTENING'
//         },
//         status: 'idle'
//     })
//     masterGuild = client.guilds.cache.find(x => x.id == 370927823948611584).channels.cache.find(x => x.id == 725394117688950815)
//     masterGuild.send(`[SYS] I'm Ready for Slooting up (Teehee)`)
// })

// Extensions outside of commandos
for (const event of readdirSync("./events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(client, ...args));
}
client.on('ready', () => {
    masterGuild = client.guilds.cache.find(x => x.id == 370927823948611584).channels.cache.find(x => x.id == 725394117688950815)
})
// Kill or Suicide events
process.on("SIGINT", async () => {
    await masterGuild.send(`[SYS] ${ero.logoff}`)
    process.exit()
})
process.on("SIGTERM", async () => {
    await masterGuild.send(`[SYS HEROKU] ${slave.logoff}`)
    process.exit()
})


try {
    // client.login(process.env.BOT_TOKEN)
    client.login('MzcwOTI4NTI1OTE5NzgwODY2.XvdCdA.P5x5cbTTwiAa_Z-TexTKUg1LBO8')
} catch(err) {
    console.log(tsundere.misc.replace('KW', 'ERROR'))
    process.exit()
}