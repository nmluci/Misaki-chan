const {Command} = require ('discord.js-commando');
const translate = require('@vitalets/google-translate-api')

module.exports = class TranslateCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'translate',
            aliases: ['translate', 'trans'],
            group: 'annoyance',
            memberName: 'translate',
            description: 'intepreting your dumbness. Language (fr)ance, (it)alian, (id)Indognesia, (ja)panese, (kr)Korean, (ru)ssian, (es)panola :v , (ml) malaysie, (ga) Irish, (tl) Filipino',
            args: [
                {
                    key: 'lang',
                    prompt: 'language to',
                    type: 'string',
                    isEmpty: true,
                    oneOf: ['fr', 'it', 'id', 'ja', 'kr', 'ru', 'es', 'ml', 'ga', 'tl']
                },
                {
                    key: 'text',
                    prompt: 'text',
                    type: 'string'
                }
            ],
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES']
            // patterns: [/fue+|kimoi+|yamete+|^kya+/i]
       })
    }

    async run(msg, { lang , text }) {
        console.log(msg.channel)
        if (!lang) lang = 'fr'
        const trans_text = await translate(text, {to: lang})
        msg.say(msg.author.username + ': ' + trans_text.text)
        msg.delete()
    }

}