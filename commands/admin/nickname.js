const { Command } = require('discord.js-commando');

module.exports = class NicknameChangerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nickname',
            aliases: ['nick', 'nickname'],
            group: 'admin',
            memberName: 'nickname',
            description: 'Change my nickname',
            guarded: true,
            args: [
                {
                    key: 'name',
                    prompt: 'Gimme da nem!',
                    type: 'string'
                }
            ],
            clientPermissions: ['MANAGE_ROLES', 'MANAGE_NICKNAMES'],
            guildOnly: true,
            ownerOnly: true
        });
    }

    async run(msg, { name }) {
        try {
            await msg.guild.member(client.user).setNickname(name)
            return msg.say(`Ma Nem Naw is ${name}`)
        } catch (err) {
            return err
        }
    }
};