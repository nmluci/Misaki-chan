const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')
const { MessageEmbed } = require('discord.js')
const GameAssets = require('../../libs/GameAssets')

module.exports = class LayfGameHelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gamehelp',
            aliases: ['ghelp', 'gamehelp'],
            group: 'games',
            memberName: 'gamehelp',
            description: 'Game of Layf with a Twist (Help)',
            clientPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES', 'EMBED_LINKS']
        })
    }
    
    async run(msg) {
        const memberRoles = msg.member.roles.cache
        const allRoles = GameAssets.genRoles()
        let assignedRoles

        if (memberRoles.some( x => allRoles.indexOf(x.name) >= 0 )) {
            for (let i=0; i < allRoles.length; i++) {
                const x = memberRoles.find(x => x.name == allRoles[i])
                // console.log('Roles', x)
                if (x) assignedRoles = x
            }
        }
        if (!assignedRoles) assignedRoles = 'no'

        let helpdesc =stripIndents`
        Created by Cxizaki (Fuyuna)

        There are ${allRoles.length} roles, and you only be able to have one at a time.
        Those roles has no other additional permission and basically exist as placeholders. 
        While it's exist as a MERELY placeholders, it does has each consequences if YOU use one of my (${this.client.user.username}) commands 
        and yes... I'll never tell what are those consequences, since it's troublesome, REALLY really REALLY reallly troublesome, more TrOuBlEsOmE than nursing a baby alien from Tamriel\n

        I see you have ${assignedRoles} roles assigned to ${msg.member.nickname ? msg.member.nickname : msg.author.username}
        `
        const helpEmbed = new MessageEmbed()
        .setTitle('Misaki Game of Layf Help Book')
        .setAuthor(`Cxizaki x Misaki x Fuyuna x ...`)
        .setColor('#ccccff')
        .setDescription(helpdesc)
        .setFooter('Beta Stage || Ma Waifu is Fuyuna-chan')
    
        msg.say(helpEmbed)
    }

    onBlock(msg, reason, mssing) {
        if (reason == 'clientPermissions') msg.say(`Apparently, I don't have a following permissions: \n ${missing}`)
    }
}