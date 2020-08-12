require('dotenv').config()
const { BOT_TOKEN, PREFIX, OWNER, DEBUG, MASTERGUILD, MASTERCH } = process.env
const MisakiClient = require('./core/client')
const { readdirSync } = require('fs')
const path = require('path')
const pkg = require('./package.json')
const { ero, tsundere } = require('./libs/Personality')

const client = new MisakiClient({
    commandPrefix: PREFIX,
    owner: OWNER,
})

client.registry
.registerDefaultTypes()
.registerGroups([
    ['ecchi', 'Ecchi'],
    ['admin', 'Admin'],
    ['annoyance', 'Annoyance'],
    ['search', 'Search'],
    ['games', 'Games'],
    ['waifu', 'Waifu']
])
.registerDefaultGroups()
.registerDefaultCommands(
    {
        help: false,
        unknownCommand: false
    }
)
.registerCommandsIn(path.join(__dirname, 'commands'));

for (const event of readdirSync("./events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(client, ...args));
}

const debug = DEBUG
if (!debug) {
    client.on('ready', () => {
        let m_guild = client.guilds.cache.find(x => x.id == MASTERGUILD).channels.cache.find(x => x.id == MASTERCH)

        process.on('SIGINT', async () => {
            await m_guild.send(client.ero.logoff)
            process.exit()
        })

        process.on('SIGTERM', async () => {
            await m_guild.send(`[HEROKU] ${client.slave.logoff}`)
            process.exit()
        })
    })
}

try {
    client.login(BOT_TOKEN)
} catch (err) {
    console.log(tsundere.misc.replace('KW', err))
    process.exit()
}