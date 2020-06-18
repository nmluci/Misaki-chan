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
            `私は愛とは何かを知っているのであれば、それはあなたのおかげです。`,
            `生まれ変わったら、あなたをもっと早く見つけるだろう。`,
            `私はあなたに書きます。`,
            `私はあなたを待っています。`,
            `お互い、他の人を探すべきだよ。`,
            `「行かないで、行かないで、行かないでくれ。僕を置いて行かないで」`,
            `「渚… 渚… 渚…」`,
            'ときにさ、思ったよ、私たちって本当に結ばれたかな、'
        ]
        const punpunTrans = [
            `I may not be your first date, kiss, or love, but I want to be your last.`,
            `To love is nothing. To be loved is something. But to love and be loved is everything.`,
            `When I look at you, I see the rest of my life in front of my eyes.`,
            `If I know what love is, it is because of you.`,
            `If I were to live my life again, I’d find you sooner.`,
            `I'll write for you.`,
            `I'll waiting for you.`,
            `We should start seeing other people`,
            `Don’t go. Don’t go. Please don’t go. Please don’t leave me behind.`,
            `Nagisa… Nagisa… Nagisa…`,
            `I've been thinking about this but, are we really get together?`
        ]

        const namba = getRandInt(punpun.length)
        const henji = punpun[namba]
        const henjiTrans = punpunTrans[namba]
        const henjiEmbed = new MessageEmbed()
        .setTitle('Misaki-chan Kataomoi Edition')
        .addField(`日本語`,henji)
        .addField(`English`,henjiTrans)
        .setColor('#b16ffc')

        msg.say(henjiEmbed)
        // if (msg.author == 360824982789685248n) msg.say('Fueee');
    }
    
}