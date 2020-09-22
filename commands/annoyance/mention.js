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
            args: [
                {
                    key: 'state',
                    prompt: 'on/off',
                    default: 'state',
                    oneOf: ['on', 'off', 'state'],
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { state }) {
        if (!this.client.owners.includes(msg.author)) return msg.say(`hey, u suld't be in here!`)
        if (state == 'on') {
            if (!this.client.settings.mention) this.client.settings.mention = true
        }
        if (state == 'off') {
            if (this.client.settings.mention) this.client.settings.mention = false
        }
        const helpEmbed = new MessageEmbed()
        .setTitle(`Misaki's Mention Setting`)
        .setAuthor('Misaki-chan')
        .setDescription(`This command give a user an option to either turn on or turn off the mention system, kinda...`)
        .addField('State', this.client.settings.mention ? 'On' : 'Off')
        .setFooter(`Fufufu`)
        msg.say(helpEmbed);
        
    } 
};