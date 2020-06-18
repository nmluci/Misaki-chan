const {Command} = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class MentionHelperCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mention',
            aliases: ['mention'],
            group: 'annoyance',
            memberName: 'mention',
            description: 'Guess wut is it',
        });
    }

    run(msg) {
        const helpEmbed = new MessageEmbed()
        .setTitle(`Misaki's Mention Setting`)
        .setAuthor('Misaki-chan')
        .setDescription(`This command give a user an option to either turn on or turn off the mention system, kinda...`)
        .addField(`Usage`, `mention_on for on`)
        .addField(`Usage`, `mention_off for off`)
        .addField(`Example`, 'mention_on')
        .setFooter(`This Bot Mainly Created to Serve ME! (Fuyuna).`)
        msg.say(helpEmbed);
    } 
};