const { Command } = require('discord.js-commando');

module.exports = class MimicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mimic',
            aliases: [' ', 'mimic'],
            group: 'annoyance',
            memberName: 'mimic',
            description: 'Probably gonna annoy you',
            args: [
                {
                    key: 'text',
                    prompt: 'what you wants to mimic',
                    type: 'string'
                }
            ],
            ownerOnly: true
        })
    }

    run(message, {text}) {
        console.log(text);
        message.say(text);
        message.delete()
    }
}