const {Command} = require ('discord.js-commando');
const translate = require('@vitalets/google-translate-api');
const { MessageEmbed } = require('discord.js');

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
                    oneOf: ['fr', 'it', 'id', 'ja', 'kr', 'ru', 'es', 'ml', 'ga', 'tl', 'de']
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
        try {
            const trans_text = await translate(text, {to: lang.toString()})
            const transEmbed = new MessageEmbed()
            .setAuthor('Misaki')
            .setTitle('Translator')
            .addField('Origin', text)
            .addField('Translation', trans_text)
            .setFooter(msg.author)
            await msg.delete()
            await msg.say(transEmbed)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return msg.say(`Err0r occured: ${err}`)
        }
    }
}