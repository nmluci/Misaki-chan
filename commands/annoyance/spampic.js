const {Command} = require('discord.js-commando');

module.exports = class SpamPicCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'spampic',
            aliases: ['spam'],
            group: 'annoyance',
            memberName: 'spam',
            description: 'Well... spam',
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'targets',
                    prompt: 'enter da link',
                    type: 'string'
                }
            ]
        })
    }
    
    run(msg, {targets}) {
        msg.say({
            files: [targets]
        })
        msg.delete()
    }
}