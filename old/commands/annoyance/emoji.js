const { Command } = require('discord.js-commando');
const message = require('../../events/message');
const { MessageEmbed } = require('discord.js');
const { NAME } = process.env

module.exports = class EmojiHelperCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            aliases: ['emoji'],
            group: 'annoyance',
            memberName: 'emoji',
            description: 'Send an emoji',
            args: [
                {
                    key: 'state',
                    prompt: 'on/off',
                    default: 'state',
                    oneOf: ['on', 'off', 'state'],
                    type: 'string'
                }
            ],
            hidden: true
        });
    }

    run(msg, { state }) {
        if (state == 'on') {
            if (!this.client.settings.emoji) this.client.settings.emoji = true
        }
        if (state == 'off') {
            if (this.client.settings.emoji) this.client.settings.emoji = false
        }
        const helpEmbed = new MessageEmbed()
        .setTitle(`${NAME}'s Emoji Sender`)
        .setAuthor(`${NAME}-chan`)
        .setDescription(`This command doesn't actually send any emojis, instead just providing a catalog of it since well... there's many of this... kinda...`)
        .addField('Emojis', `annoyed, blush, gomen, cry, dance, dere, ehehe, eww, fuee, hentai, huh, kyaa, pregnant`)
        .addField(`Usage`, `Well.. just enter: _ + ur emoji of choice`)
        .addField(`Example`, '_potato')
        .addField("State", this.client.settings.emoji ? 'On' : 'Off')
        .setColor('#b16ffc')
        msg.say(helpEmbed);
    } 
};