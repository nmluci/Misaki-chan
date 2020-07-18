const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')
const { MessageEmbed } = require('discord.js')
const GameAssets = require('../../libs/GameAssets')
const Utils = require('../../libs/Utils')
const {tsundere, deredere, slave, ero} = require('../../libs/Personality')

module.exports = class LayfGameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'layf',
            aliases: ['layf', 'gol'],
            group: 'games',
            memberName: 'layf',
            description: 'Game of Layf with a Twist',
            clientPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES', 'EMBED_LINKS'],
            guildOnly: true
        })
    }
    
    async run(msg) {
        // Array that stores all possible roles for comparison
        let allRoles = GameAssets.genRoles()

        function getRandInt(int) { return Math.floor(Math.random() * int) }

        async function assignRoles(roles) {
            roles = roles.toString()
            const assignedRoles = msg.guild.roles.cache.find(role => role.name == roles)

            // Checking if member have any roles assigned
            const memberRoles = msg.member.roles.cache

            // console.log(memberRoles)
            // console.log("Roles", allRoles)
            // console.log("State" ,memberRoles.some(x => allRoles.indexOf('superb-deredere') >= 0))

            // Checking whether the corresponding user has a roles assigned to before
            if (memberRoles.some( x => allRoles.indexOf(x.name) >= 0 )) {
                for (let i=0; i < allRoles.length; i++) {
                    const x = memberRoles.find(x => x.name == allRoles[i])
                    // console.log('Roles', x)
                    if (x) msg.member.roles.remove(x)
                }
            }

            // Checking whether the roles had been made in corresponding guilds
            if (!assignedRoles) {
                let colors = GameAssets.role(roles).toString()
                await msg.guild.roles.create({
                    data: {
                        name: roles,
                        color: colors
                    }
                })
                await msg.member.roles.add(roles)
            } else {
                // msg.say('Roles Exist!')
                // Add the roles if the corresponding roles is exist
                msg.member.roles.add(assignedRoles)
            }
            gamesEmbed.addField(`Congrats ${msg.author.username}`, `You got ${roles} roles. Be sure to treasure it nicely!`)
            return await m.edit(gamesEmbed)
        }

        // Initialization of Common Events from external references
        const commonEvent = GameAssets.common_events()
        let pernum = Utils.getRandInt(3)
        if (pernum == 0) msg.say(tsundere.gameoflayf)
        if (pernum == 1) msg.say(deredere.gameoflayf)
        if (pernum == 2) msg.say(slave.gameoflayf)
        if (pernum == 3) msg.say(ero.gameoflayf)

        // Warning and Initialization
        const gamesEmbed = new MessageEmbed()
        .setTitle('Game of Layf with a Twist')
        .setDescription(`⚠️ Beta Feature ⚠️\n⚠️ Not Intended to be Pleasurable ⚠️\nFor any information about the rules and its consequences, try using ${this.client.commandPrefix} gamehelp!`)
        .setFooter('F. 0.3.1 (since v. ftw)')
        let m = await msg.say(gamesEmbed)

        // Calculating traits
        const results = commonEvent[getRandInt(commonEvent.length)]
        const startOffset = results.indexOf('[')
        const endOffset = results.indexOf(']')
        const trait = results.slice(startOffset+1, endOffset)
        const fate = results.slice(0, startOffset)

        // Add the result of fate 
        gamesEmbed.addField('Your Fate', fate)
        await m.edit(gamesEmbed)
        // const trait = 'Fuee'
        
        assignRoles(trait.toString())
    }

    onBlock(msg, reason, mssing) {
        if (reason == 'clientPermissions') msg.say(`Apparently, I don't have a following permissions: \n ${missing}`)
    }
}