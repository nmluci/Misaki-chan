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
                    key: 'user',
                    prompt: 'Gimme da nem!',
                    type: 'user'
                },
                {
                    key: 'roles',
                    prompt: 'to wer?',
                    type: 'string'
                }
            ],
            userPermissions: ['MANAGE_ROLES'],
            guildOnly: true
        });
    }

    async run(msg, {user, roles}) {
        let muterole = msg.guild.roles.cache.filter(role => role.name === roles)

        let member = msg.mentions.members.first();

        console.log(member, muterole)
        member.roles.add(muterole)
        msg.say('きゃ!')
    }
};