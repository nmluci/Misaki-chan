const request = require('node-superfetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UrbanSearchCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'urban',
            aliases: ['urban'],
            group: 'search',
            memberName: 'urban',
            description: 'Search defintion according tu Urban Dictionary',
            args: [
                {
                    key: 'word',
                    prompt: 'word you wanna to search',
                    type: 'string'
                }
            ]
        })
    }

    async run(msg, { word }) {
        try {
            const { body } = await request
            .get('https://api.urbandictionary.com/v0/define')
            .query({
                term: word
            });

            if (!body.list.length) return msg.say(`It seems there's no proper definiton about ${word} according to Urban Dictionary.`).then(msg.say(`O'kawaii koto`));
            const info = body.list[0];
            info.definition.replace('[', '')
            info.definition.replace(']', '')
            const infoEmbed = new MessageEmbed()
            .setTitle('Misaki x Urban Dictionary')
            .setColor(0x34eb83)
            .addField('Definition', info.definition, true)
            .setURL(info.permalink)

            return msg.say(infoEmbed)
        } catch(err) {
            msg.say('Fuee')
        }
    }

}