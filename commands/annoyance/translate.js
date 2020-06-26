const {Command} = require ('discord.js-commando');
const translate = require('@vitalets/google-translate-api')

module.exports = class TranslateCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'translate',
            aliases: ['translate', 'trans'],
            group: 'annoyance',
            memberName: 'translate',
            description: 'intepreting your dumbness',
            args: [
                {
                    key: 'text',
                    prompt: 'text',
                    type: 'string'
                }
            ]
            // patterns: [/fue+|kimoi+|yamete+|^kya+/i]
       })
    }

    async run(msg, { text }) {
        const lang = 'fr'
        if (msg.author == 457832151769939969n) lang = 'it'
        const trans_text = await translate(text, {to: lang})
        msg.say(msg.author.username + ': ' + trans_text.text)
        msg.delete()
    }

}