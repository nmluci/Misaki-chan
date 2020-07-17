const { CommandoClient, Command } = require('discord.js-commando');
const path = require('path');
const { readdirSync } = require('fs');
const client = new CommandoClient({
    commandPrefix: 'misaki',
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
    masterGuild = client.guilds.cache.find(x => x.id == 370927823948611584).channels.cache.find(x => x.id == 725394117688950815)
    masterGuild.send(`[SYS] I'm Ready for Slooting up (Teehee)`)
})

// Extensions outside of commandos
for (const event of readdirSync("./events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(...args));
}

// Kill or Suicide events
process.on("SIGINT", async () => {
    await masterGuild.send('[SYS] Master... Sorry... I think I had a baby to kil- I meant my womb need more something...')
    process.exit()
})
process.on("SIGTERM", async () => {
    await masterGuild.send(`[SYS] Rebooting for Update (Heroku says so), if I don't wake then its mostly Heroku's fault`)
    process.exit()
})


try {
    client.login(process.env.BOT_TOKEN)
    // client.login('MzcwOTI4NTI1OTE5NzgwODY2.XvdCdA.P5x5cbTTwiAa_Z-TexTKUg1LBO8')
} catch(err) {
    console.log(`[ERROR] ${err}`)
    process.exit()
}