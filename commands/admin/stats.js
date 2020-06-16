const {Command} = require ('discord.js-commando');
const pkg = require('../../package.json');
const { MessageEmbed } = require('discord.js');
const { version } = require('snekfetch');

function parseDur(ms){
    let seconds = ms / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    let fin = [];
    if(days) fin.push(`${days}d`);
    if(hours) fin.push(`${hours}h`);
    if(minutes) fin.push(`${minutes}m`);
    fin.push(`${seconds}s`);
    return fin.join(' ');
}

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
        const botVersion = pkg.version;
        const botAuthor = pkg.author;
        const statsMsg = new MessageEmbed()
        .setAuthor('Misaki-chan Slave Tag')
        .addField('Mem. Usage', `${Math.floor(process.memoryUsage().heapUsed/1048675)} MB`, true)
        .addField("Bot Version", `${botVersion}`, true)
        .addField('Node', `${process.version}`, true)
        .addField(`Owner`, `${botAuthor}`)

        msg.say(statsMsg)
    }
}