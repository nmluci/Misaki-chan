const { Command } = require('discord.js-commando');

module.exports = class SetSlaveTags extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: ['prs'],
            group: 'admin',
            memberName: 'status',
            description: 'Change my current pressence',
            args: [
                {
                    key: "fuee",
                    prompt: 'marriage or wut? or perhaps grand SLAVE?!',
                    type: 'string',
                    oneOf: ['play', 'stream', 'listen', 'watch']
                },
                {
                    key: "status",
                    prompt: 'Ehm',
                    type: "string"
                }
            ],
            nsfw: false,
            userPermissions: ['MANAGE_ROLES']
        });
    }

    run(msg, {fuee, status}) {
        if (fuee == 'play') fuee = 'playing';
        if (fuee == 'stream') fuee = 'streaming';
        if (fuee == 'listen') fuee = 'listening';
        if (fuee == 'watch') fuee = 'watching';
        msg.delete()
        fuee = fuee.toString().toUpperCase();
        this.client.user.setPresence({
            activity: {
                name: status,
                type: fuee
            },
            status: 'idle'
        })
    } 
};