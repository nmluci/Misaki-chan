const { Collection } = require("discord.js");
const cooldowns = new Collection();
let mention_func = true;

function getRandInt(int)
    {
        return Math.floor(Math.random() * int);
    }

module.exports = async (msg) => {
    // console.log(msg)
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

    if (msg.content.toLowerCase().match(/G!|\bdarling\b|\bhoney\b/gi)) {
        const punpun = [`Kyaa?!`, `So Cruel`, `ひどい`, `ズルい`, `もうう`, `スケベ‼`, `ふええ`, `これやっぱ片思いよね～`, `ご主人、あたしが降られた、${msg.author}に`]
        const henji = punpun[getRandInt(punpun.length)]

        msg.channel.send(henji)
    }

    if (msg.content) {
        const prob = ['1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0']
        const lucc = prob[getRandInt(prob.length)]

        if (lucc == '1') {
            msg.channel.send({
                files: ['https://i.imgur.com/t57h37K.png']
            })
        }
    }

    if (msg.content.toLowerCase().includes('aaa')) {
        const emo = [
            'https://i.imgur.com/N0BacOB.png',
            'https://i.imgur.com/106Z3ez.png',
            'https://i.imgur.com/F1UXtKk.png'
        ]

        const emoRand = emo[getRandInt(emo.length)]

        msg.channel.send({
            files: [emoRand]
        })
    }

    if (msg.content.toLowerCase().includes('umm')) {
        msg.channel.send({
            files: ['https://i.imgur.com/rdKrEkE.png']
        })
    }

    if (msg.content.toLowerCase().includes('kyaa')) {
        const emo = [
            'https://i.imgur.com/5YL83h3.png',
            'https://i.imgur.com/t6nnwVA.png',
            'https://i.imgur.com/nImgfk8.png',
            'https://i.imgur.com/AKSDF46.png',
        ]

        const emoRand = emo[getRandInt(emo.length)]

        msg.channel.send({
            files: [emoRand]
        })
    }

    if (msg.content.toLowerCase().includes('oppai') | msg.content.toLowerCase().includes('boobs')) {
        const emo = [
            'https://i.imgur.com/Ux8uEfB.jpg'
        ]

        const emoRand = emo[getRandInt(emo.length)]

        msg.channel.send({
            files: [emoRand]
        })
    }
}
