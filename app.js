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
let mention_func = true;

client.on('message', (msg) => {
    if (mention_func) {
        if (msg.content.toLowerCase().includes('hentong')) {
           msg.channel.send("ダメ").then(msg => msg.edit('そんなの絶対ダメ'))
        }
    
        if (msg.content.toLowerCase().includes('duit')) {
            msg.channel.send('NU')
        }
        if (msg.content.toLowerCase().includes('mani')) {
            msg.channel.send('NU')
        }
        if (msg.content.toLowerCase().includes('money')) {
            msg.channel.send('NU')
        }
        if (msg.content.toLowerCase().includes('okane')) {
            msg.channel.send('meh')
        }
        if (msg.content.toLowerCase().includes('kentang')) {
            msg.channel.send(`<@${'663247501729595432'}>`)
        }
        if (msg.content.toLowerCase() === 'random') {
            msg.channel.send('へんたい‼').then(msg => msg.delete(3000))
        }
        if (msg.author == 387120117592621056n) {
            if (mention_func) {
                msg.channel.send('Fueeee');
                msg.author.send('Fueee');
            }
        }    
    }    

    if (msg.content.toLowerCase().includes('mention_off')) {
        if (msg.author != 387120117592621056n) {
            msg.channel.send(`I'm turned on!`);
            if(mention_func) mention_func = false;
            msg.channel.send(`current status ${mention_func}`).then(msg => msg.delete(3000));
        }
    };
    
    if (msg.content.toLowerCase().includes('mention_on')) {
        if (msg.author != 387120117592621056n) {
            msg.channel.send(`I'm turned on!`);
            if (!mention_func) mention_func = true;
            msg.channel.send(`current status ${mention_func}`).then(msg => msg.delete(3000));
        }
    }
    
});

client.login("MzcwOTI4NTI1OTE5NzgwODY2.Xlf5qQ.CB_05Vmvbn2HUbT9NHKC9SfBKWg")
// client.login(process.env.BOT_TOKEN);
