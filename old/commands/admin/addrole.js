const { Command } = require('discord.js-commando');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class BondageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addrole',
            aliases: ['add', 'addrole', 'arole'],
            group: 'admin',
            memberName: 'addrole',
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
        try {
            let muterole = msg.guild.roles.cache.find(role => role.name === roles)
            let member = msg.mentions.members.first()
            if (!muterole) {
                msg.guild.roles.create({
                    data: {
                        name: roles,
                        color: '0xff5533'
                    }
                }).then(function (roles) {
                    member.roles.add(roles)
                })
            } else {
                member.roles.add(roles)
            }
    
            // console.log(member, muterole)
            member.roles.add(muterole)
            msg.say('きゃ!')
        } catch (err) {
            return err
        }
    }
};