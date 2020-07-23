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
        .setAuthor('Misaki', null, 'https://github.com/nmluci/Misaki-chan')
        .setTitle('About Me')
        .setDescription(`I'm <@${this.client.options.owner}>'s beta-assistant which apparently has no reason to live(?). Anyway, I can do some stuff, including one you won;t even willing to hear, so be prepared with it`)
        .addField('Original Auth0r', 'Cxizaki', true)
        .setColor('#CCCCFF')
        .setFooter('Kyaa~')

        const ownerAbout = new MessageEmbed()
        .setAuthor('Cxizaki')
        .setTitle('About Owner')
        .setDescription(`A newbie programmer. Its favourite things is ...`)
        .addField('Age', 'Unknown')
        .addField('Real Name', 'TGlrZSB0aGUgaGVsbCBJJ20gZ29ubmEgdGVsbCB5b3Ugc3RyYWlnaHQgb3V0CkZ1ZWVl')
        .addField('Usually programs in', 'Non-human language')
        .setColor('#CCCCFF')
        .setFooter('Kyaa~')

        await msg.say(botAbout)
        await msg.say(ownerAbout)
    }
}