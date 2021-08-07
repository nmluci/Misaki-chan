require("dotenv").config()
const {BOT_TOKEN, DEBUG, PREFIX} = process.env
const {Client, Intents, Collection} = require("discord.js")
const fs = require("fs")

const misaki = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ]})
misaki.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"))
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        misaki.once(event.name, (...args) => event.execute(...args, misaki))
    }
    else {
        misaki.on(event.name, (...args) => event.execute(...args, misaki))
    }
}

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    console.log(`Loaded ${command.name}`)
    misaki.commands.set(command.name, command)
}

try {
    misaki.login(BOT_TOKEN)
} catch (err) {
    console.log(err)
}