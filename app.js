const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
//const { TOKEN } = require("./config.json");
const Fyn = require("./lib/FynClient");

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


//EXTENSION 
client.on('message', (Message) => {
    if (Message.content.toLowerCase().startsWith("ping")) {
        Message.channel.send("Pong!")
    };
    if (Message.content.toLowerCase().includes('hentong')) {
       Message.channel.send("ダメ").then(Message => Message.edit('そんなの絶対ダメ'))
    }

    if (Message.content.toLowerCase().includes('duit')) {
        Message.channel.send('NU')
    }
    if (Message.content.toLowerCase().includes('mani')) {
        Message.channel.send('NU')
    }
    if (Message.content.toLowerCase().includes('money')) {
        Message.channel.send('NU')
    }
    if (Message.content.toLowerCase().includes('okane')) {
        Message.channel.send('NU')
    }
    if (Message.content.toLowerCase().includes('kentang')) {
        Message.channel.send(`<@${'663247501729595432'}>`)
    }

    if (Message.author == 387120117592621056n) {
        Message.channel.send('Fueeee');
        Message.author.send('Fueee');
    }
});
client.login("MzcwOTI4NTI1OTE5NzgwODY2.Xlf5qQ.CB_05Vmvbn2HUbT9NHKC9SfBKWg")
// client.login(process.env.BOT_TOKEN);
