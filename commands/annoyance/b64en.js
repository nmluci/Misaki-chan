const {Command} = require ('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class base64Encoder extends Command {
    constructor (client) {
        super(client, {
            name: 'b64en',
            aliases: ['b64encoder'],
            group: 'annoyance',
            memberName: 'b64encoder',
            description: 'intepreting your delta-dumbness.',
            args: [
                {
                    key: 'text',
                    prompt: 'text',
                    type: 'string'
                }
            ],
            hidden: true,
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES']
            // patterns: [/fue+|kimoi+|yamete+|^kya+/i]
       })
    }

    async run(msg, { text }) {
        try {
            let buff = Buffer.from(text, 'utf-8')
            let encoded = buff.toString('base64').toString()
            const encodedEmbed = new MessageEmbed()
            .setAuthor('Misaki Intepreter')
            .setTitle('Misaki base64 Encoder')
            .setDescription(`Plain text\n${text}`)
            const extendEmbed = new MessageEmbed()
            .setDescription(`Encoded\n${encoded}`)
            await msg.say(encodedEmbed)
            await msg.say(extendEmbed)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return msg.say(`Err0r occured: ${err}`)
        }
    }
}