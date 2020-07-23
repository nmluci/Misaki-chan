const {Command} = require ('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class base64Decoder extends Command {
    constructor (client) {
        super(client, {
            name: 'b64de',
            aliases: ['b64decoder'],
            group: 'annoyance',
            memberName: 'b64decoder',
            description: 'intepreting your alpha-dumbness.',
            args: [
                {
                    key: 'text',
                    prompt: 'chiper text',
                    type: 'string'
                }
            ],
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES']
            // patterns: [/fue+|kimoi+|yamete+|^kya+/i]
       })
    }

    async run(msg, { text }) {
        try {
            let buff = Buffer.from(text, 'base64')
            let decoded = buff.toString("utf-8").toString()
            const decodedEmbed = new MessageEmbed()
            .setAuthor('Misaki Intepreter')
            .setTitle('Misaki base64 Decoder')
            .setDescription(`Chiper text\n${text}`)
            const extendEmbed = new MessageEmbed()
            .setDescription(`Decoded\n${decoded}`)
            await msg.say(decodedEmbed)
            await msg.say(extendEmbed)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return msg.say(`Err0r occured: ${err}`)
        }
    }
}