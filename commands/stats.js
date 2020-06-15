const { version } = require("discord.js");
const pkg = require("../package.json");

exports.run = async (client, msg, args) => {
    const uptime = client.util.parseDur(client.uptime);
    const botVersion = pkg.version;
    const botAuthor = pkg.author;

    msg.channel.send(`\`\`\`\`
Mem. Usage :: ${Math.floor(process.memoryUsage().heapUsed/1048576)} MB
Uptime     :: ${uptime}
WS Ping    :: ${client.ws.ping.toFixed(2)}ms
Users      :: ${client.users.cache.size.toLocaleString()}
Servers    :: ${client.guilds.cache.size.toLocaleString()}
Channels   :: ${client.channels.cache.size.toLocaleString()}
Bot Vers.  :: ${botVersion}
Discord.js :: v${version}
Node       :: ${process.version}
Owner      :: ${botAuthor}\`\`\`\``)
}

exports.conf = {
    aliases: [],
    cooldowns: "10"
}

exports.help = {
    name: "stats",
    description: "Show bot status",
    usage: "stats"
}
