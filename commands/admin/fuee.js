const { Command } = require('discord.js-commando');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fuee',
            aliases: [''],
            group: 'admin',
            memberName: 'fuee',
            description: 'Probably your only commands that i will accept',
            guarded: true,
            args: [
                {
                    key: 'command',
                    prompt: 'Gimme da command!',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(msg, args) {
        const fHelp = new MessageEmbed()
        .setAuthor('Misaki-chan', `https://i.imgur.com/OFC149y.png`)
        .setColor('#b16ffc')
        .setDescription(`Created by ${this.client.owners} [Click Here](https://www.Instagram.com/nm.lucius)`)
        return msg.say(fHelp)
    }
};