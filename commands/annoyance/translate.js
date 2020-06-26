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
        const trans_text = await translate(text, {to: 'fr'})
        msg.say(trans_text)
    }

}