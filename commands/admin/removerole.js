const { Command } = require('discord.js-commando');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class UnBondageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'removerole',
            aliases: ['remove', 'rrole', 'removerole'],
            group: 'admin',
            memberName: 'removerole',
            description: 'Probably your only commands that i will accept',
            guarded: true,
            userPermissions: ['MANAGE_ROLES'],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Who u wanna picked up?',
                    type: 'user'
                },
                {
                    key: 'roles',
                    prompt: 'Where to',
                    type: 'string'
                }
            ],
            userPermissions: ['MANAGE_ROLES'],
        });
    }

    async run(msg, {user, roles}) {
        let muterole = msg.guild.roles.cache.find(role => role.name === roles)
        let member = msg.mentions.members.first()


        // console.log(member, muterole)
        member.roles.remove(muterole)
        msg.say('きゃ!')
    }
};

