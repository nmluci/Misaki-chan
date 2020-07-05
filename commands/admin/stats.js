const {Command} = require ('discord.js-commando');
const pkg = require('../../package.json');
const { MessageEmbed } = require('discord.js');
const Utils = require('../../libs/Utils')

module.exports = class BotStatus extends Command{
    constructor(client) {
        super(client, {
            name: 'stats',
            aliases: ['stats'],
            group: 'admin',
            memberName: 'stats',
            description: 'Well... status',
            ownerOnly: true
        })
    }
    
    run(msg) {
        const uptime = (Utils.parseDur(this.client.uptime));
        const botVersion = pkg.version;
        const botAuthor = pkg.author;
        const statsMsg = new MessageEmbed()
        .setAuthor('Misaki-chan Slave Tag')
        .addField('Uptime', `${uptime}`)
        .addField('Mem. Usage', `${Math.floor(process.memoryUsage().heapUsed/1048675)} MB`, true)
        .addField("Bot Version", `${botVersion}`, true)
        .addField('Node', `${process.version}`, true)
        .addField(`Owner`, `${botAuthor}`)
        .setColor('#b16ffc')
        msg.say(statsMsg)
    }
}