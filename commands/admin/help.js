const { Command } = require('discord.js-commando');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dasketeh',
            aliases: ['h'],
            group: 'admin',
            memberName: 'dasketeh',
            description: 'Probably your only commands that i will accept'
        });
    }

    run(msg) {
        return msg.say('Kyaa')
    }
};