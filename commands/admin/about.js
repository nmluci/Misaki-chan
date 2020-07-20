const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class AboutMe extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            aliases: ['ab'],
            group: 'admin',
            memberName: 'about',
            description: 'Well... about'
        })
    }

    async run(msg) {
        const botAbout = new MessageEmbed()
        .setAuthor('Misaki')
        .setDescription('This Slave is purely made for serving ME!')
        .addField('Original Auth0r', 'Lynne Fuyuna a.k.a Cxizaki', true)
        .setColor('#CCCCFF')
        .setFooter('Kyaa~')

        const ownerAbout = new MessageEmbed()
        .setAuthor('Cxizaki')
        .setTitle('About Owner')
        .setDescription(`A newbie programmer. Her favourite things is people's suffers especially broken hearts >//<`)
        .addField('Age', 'Unknown')
        .addField('Real Name', 'Chizaki x Misaki')
        .addField('Program in', 'Non-human language')
        .setColor('#CCFFFF')
        .setFooter('Kyaa~')

        await msg.say(botAbout)
        await msg.say(ownerAbout)
    }
}