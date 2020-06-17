const { Command } = require('discord.js-commando');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class UnBondageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            aliases: ['unmute'],
            group: 'admin',
            memberName: 'unmute',
            description: 'Probably your only commands that i will accept',
            guarded: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Gimme da user!',
                    type: 'string',
                    default: ''
                }
            ],
            userPermissions: ['MANAGE_ROLES'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        if (msg.guild === null) return;
        if (args) msg.say(args);
    }
};

