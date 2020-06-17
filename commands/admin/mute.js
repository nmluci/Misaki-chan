const { Command } = require('discord.js-commando');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class BondageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            aliases: [''],
            group: 'admin',
            memberName: 'mute',
            description: 'Probably your only commands that i will accept',
            guarded: true,
            args: [
                {
                    key: 'command',
                    prompt: 'Gimme da command!',
                    type: 'string',
                    default: ''
                }
            ],
            userPermissions: ''
        });
    }

    async run(msg, args) {
        const fHelp = new MessageEmbed()
        .setAuthor('Misaki-chan', `https://i.imgur.com/OFC149y.png`)
        .setColor('#CCCCFF')
        .setDescription(`Created by ${this.client.owners} [Click Here](https://www.Instagram.com/nm.lucius)`)
        return msg.say(fHelp)
    }
};