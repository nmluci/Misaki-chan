const {Command} = require ('discord.js-commando');
const { MessageEmbed } = require('discord.js');

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
            // patterns: [/G!|\bdarling\b|\bhoney\b/gi]
       })
    }

    run(msg) {
        const punpun = [
            'あたしはあなたが最初にデート、キスした人、あるいは最初の恋人じゃないかもしれませんが、あなたのさいごのひとになりたいです。',
            `愛することは何もありません。愛されることは何かがあります。でも、愛することと愛されることは全てです。`,
            `私があなたを見るとき、目の前に私の残りの人生が見えます。`,
            `私は愛とは何かを知っているのであれば、それはあなたのおかげです。`
        ]
        const henji = punpun[getRandInt(punpun.length)]
        const henjiEmbed = new MessageEmbed()
        .setTitle('Misaki-chan Kataomoi Edition')
        .setDescription(henji)
        msg.say(henjiEmbed)
        // if (msg.author == 360824982789685248n) msg.say('Fueee');
    }
    
}