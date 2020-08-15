const {Command} = require ('discord.js-commando');
const pkg = require('../../package.json');
const { MessageEmbed } = require('discord.js');
const Utils = require('../../libs/Utils')
const { NAME } = process.env

module.exports = class BotStatus extends Command{
    constructor(client) {
        super(client, {
            name: 'stats',
            aliases: ['stats'],
            group: 'admin',
            memberName: 'stats',
            description: 'Well... status'
        })
    }
    
    run(msg) {
        const uptime = (Utils.parseDur(this.client.uptime));
        const botVersion = pkg.version;
        const botAuthor = pkg.author;
        const cmdCount = this.client.registry.commands
        .filter(x => x.ownerOnly != true)
        .filter(x => x.guildOnly != true)
        .filter(x => x.hidden != true)
        .keyArray()
        // console.log(cmdCount)
        const statsMsg = new MessageEmbed()
        .setAuthor(`${NAME} ID Card`)
        .addField('Prefix', this.client.options.commandPrefix, true)
        .addField('Uptime', `${uptime}`)
        .addField('Mem. Usage', `${Math.floor(process.memoryUsage().heapUsed/1048675)} MB`, true)
        .addField("Bot Version", `${botVersion}`, true)
        .addField('Node', `${process.version}`, true)
        .addField(`Owner`, `${botAuthor}`)
        .addField('Available Commands', `${cmdCount.length} Commands Available`, true)
        .setColor('#b16ffc')
        msg.say(statsMsg)
    }
}