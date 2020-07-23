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
            description: 'intepreting your dumbness. Language (fr)ance, (it)alian, (id)Indognesia, (ja)panese, (Ko)rean, (ru)ssian, (es)panola :v , (ml) malaysie, (ga) Irish, (tl) Filipino, (el) greek, (zh-CN) Chinese',
            args: [
                {
                    key: 'lang',
                    prompt: 'language to',
                    type: 'string',
                    oneOf: ['en','fr', 'it', 'id', 'ja', 'ko', 'ru', 'es', 'ml', 'ga', 'tl', 'de', 'cn', 'el']
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
            if (lang == 'cn') lang = 'zh-CN'
            const trans_text = await translate(text, {to: lang.toString()})
            let transEmbed = new MessageEmbed()
            .setAuthor('Misaki')
            .setTitle('Translator')
            .addField('Origin', text)
            .addField('Translation', trans_text.text)
            .setFooter(msg.member.nickname ? msg.member.nickname : msg.author.username)
            if (trans_text.pronunciation) transEmbed.addField('Pronunciation', trans_text.pronunciation)
            await msg.delete()
            await msg.say(transEmbed)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return msg.say(`Err0r occured: ${err}`)
        }
    }
}