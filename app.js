const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const Fyn = require("./lib/FynClient");
const http = require('http');

http.createServer((req, res) => {
res.writeHead(200, {
    'Content-type': 'text/plain'
});
    res.write('Hey');
    res.end();
}).listen(4000);

const client = new Fyn({
    fetchAllMembers: true,
    disableEvents: [
        "GUILD_SYNC",
        "PRESENCE_UPDATE",
        "TYPING_START"
    ]
});

// events
for (const event of readdirSync("./events")) {
    client.on(event.split(".")[0], (...args) => require(`./events/${event}`)(client, ...args));
}

// modules
client.commands = new Collection();
client.aliases = new Collection();

for (const command of (readdirSync(`./commands`).filter(x => x.endsWith(".js")))) {
    let cmd = require(`./commands/${command}`);
    client.commands.set(cmd.help.name.toLowerCase(), cmd);
    // get aliases command
    for (const alias of cmd.conf.aliases) {
        client.aliases.set(alias.toLowerCase(), cmd.help.name.toLowerCase());
    }
}

client.login(TOKEN);
