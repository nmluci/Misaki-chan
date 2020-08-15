const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { NAME } = process.env
module.exports = class ToxicHelperCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'filter',
            aliases: ['filter'],
            group: 'annoyance',
            memberName: 'filter',
            description: 'Meters the n levels',
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
        if (!this.client.owners.includes(msg.author)) return msg.say(`hey, u suld't be in here!`)
        const helpEmbed = new MessageEmbed()
        .setTitle(`${NAME}'s Toxicity Setting`)
        .setAuthor(`${NAME}-chan`)
        .setDescription(`This command give a user an option to either turn on or turn off the toxicity-metering system, kinda...`)
        .addField('State', this.client.settings.msgFilter ? 'On' : 'Off')
        .setFooter(`Fufufu`)
        msg.say(helpEmbed);
        if (state == 'on') {
            if (!this.client.settings.msgFilter) this.client.settings.msgFilter = true
        }
        if (state == 'off') {
            if (this.client.settings.msgFilter) this.client.settings.msgFilter = false
        }
        
    } 
};