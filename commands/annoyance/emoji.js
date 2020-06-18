const { Command } = require('discord.js-commando');
const message = require('../../events/message');
const { MessageEmbed } = require('discord.js');

module.exports = class EmojiHelperCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            aliases: ['emoji'],
            group: 'annoyance',
            memberName: 'emoji',
            description: 'Send an emoji'
        });
    }

    run(msg) {
        const helpEmbed = new MessageEmbed()
        .setTitle(`Misaki's Emoji Sender`)
        .setAuthor('Misaki-chan')
        .setDescription(`This command doesn't actually send any emojis, instead just providing a catalog of it since well... there's many of this... kinda...`)
        .addField('Emojis', `annoyed, blush, gomen, cry, dance, dere, ehehe, eww, fuee, hentai, huh, kyaa, pregnant`)
        .addField(`Usage`, `Well.. just enter: _ + ur emoji of choice`)
        .addField(`Example`, '_potato')
        .setFooter(`This Bot Mainly Created to Serve ME! (Fuyuna).`)

        msg.say(helpEmbed);
    } 
};