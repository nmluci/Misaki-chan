const {Command} = require ('discord.js-commando');

function getRandInt(int)
    {
        return Math.floor(Math.random() * int);
    }

module.exports = class KataomoiCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'kataomoi',
            aliases: ['k'],
            group: 'annoyance',
            memberName: 'kataomoi',
            description: '片思いは本当に悔しいだよねー',
            patterns: [/G!|\bdarling\b|\bhoney\b/gi]
       })
    }

    run(msg) {
        const punpun = [`Kyaa?!`, `So Cruel`, `ひどい`, `ズルい`, `もうう`, `スケベ‼`, `ふええ`, `これやっぱ片思いよね～`, `ご主人、あたしが降られた、<${msg.author}>に`]
        const henji = punpun[getRandInt(punpun.length)]

        msg.say(henji)
        // if (msg.author == 360824982789685248n) msg.say('Fueee');
    }
    
}