const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { Message } = require('discord.js');

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

//Extensions

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
            msg.channel.send('へんたい‼')
        }
        if (msg.author == 387120117592621056n) {
            
            //glentod
            msg.channel.send('Fueeee');
            msg.author.send('Fueee');    
        }    
    }    
    
    
    if (msg.content.toLowerCase().includes('mention_off')) {
        if (msg.author != 387120117592621056n) {
            msg.channel.send(`I'm turned on!`).then(msg => msg.delete());
            if(mention_func) mention_func = false;
            msg.channel.send(`current status ${mention_func}`).then(msg => msg.delete());
        }
    };
    
    if (msg.content.toLowerCase().includes('mention_on')) {
        if (msg.author != 387120117592621056n) {
            msg.channel.send(`I'm turned on!`).then(msg => msg.delete());
            if (!mention_func) mention_func = true;
            msg.channel.send(`current status ${mention_func}`).then(msg => msg.delete());
        }
    } 

    if (msg.content.toLowerCase().includes('fue')) {
        if (msg.author == 360824982789685248n) {
            msg.channel.send('Fuee')
        }
    }
});

client.login(process.env.BOT_TOKEN)