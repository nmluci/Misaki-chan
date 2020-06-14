const Discord = require("discord.js")
const Client = new Discord.Client();
// import { API, } from 'nhentai-api';
// const api = new API();

Client.on('ready', () => {
    console.log("Second Process WORKING!")
});

Client.on("message", (Message) => {
    if (Message.content.toLowerCase().startsWith("ping")) {
        Message.channel.send("Pong!")
    };
    if (Message.content.toLowerCase().includes('Hentong')) {
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
    // if (Message.content.toLowerCase().includes('sauce')) {
    //     const Embed1 = new Discord.MessageEmbed()
    //     .setColor('#CCCCFF')
    //     .setAuthor('Luci')
    //     .addField()

    // }
    // if (Message.author == 360824982789685248n) {
    //     Message.channel.send('Kyaa Mastah')
    // }
});

// async function searchDoujin(code) {
//     await api.getBook(code) {
//         await api.getBook(code)
//     }
// }
// Client.on('ready')
Client.on("messageDelete", (Message) => {
    Message.channel.send(`きゃあ、<@${'663247501729595432'}>ーさんが死んだ`)
})
// Client.login("NjY2MjYwNzU5OTY1MDczNDA4.Xt-QPA.zVNIxpTdQcq6IJYWmoIwrbVgMi4") // Rei-chan
Client.login("MzcwOTI4NTI1OTE5NzgwODY2.Xlf5qQ.CB_05Vmvbn2HUbT9NHKC9SfBKWg") // Misaki-chan
// Client.login(process.env.BOT_TOKEN);
