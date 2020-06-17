const { Command } = require('discord.js-commando');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class BondageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: ['mute'],
            group: 'admin',
            memberName: 'mute',
            description: 'Probably your only commands that i will accept',
            guarded: true,
            args: [
                {
                    key: 'command',
                    prompt: 'Gimme da command!',
                    type: 'string'
                }
            ],
            userPermissions: ['MANAGE_ROLES'],
            guildOnly: true
        });
    }

    async run(msg, args) {
        if (msg.guild === null) return;
        console.log(args)
    }
};