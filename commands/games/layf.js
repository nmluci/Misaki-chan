const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')

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
        function getRandInt(int) { return Math.floor(Math.random() * int); }

        async function assignRoles(roles) {
            roles = roles.toString()
            let assignedRoles = msg.guild.roles.cache.find(role => role.name == roles)
            if (!assignedRoles) {
                // msg.say(`Roles ain't exist`)
                if (roles == 'superb-genius') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#8dfa11'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'genius') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#5dfa11'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'superb-awkward') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#008f99'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'awkward') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#05f0fc'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'superb-deredere') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#f48cfa'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'deredere') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#f34cfc'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'idiot') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#ffffff'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
            } else {
                // msg.say('Roles Exist!')
                msg.member.roles.add(roles)
            }
            return msg.say(`Congrats ${msg.author}, you got ${roles} roles. Be sure to treasure it nicely!`)
        }
        
        const bedlak = [
        'You fell from your seat while sleeping in the class [awkward]',
        'You met your crush in the pathway to school [deredere]',
        'Your crush sees you doing miserable things [awkward]',
        'You found out that your crush already dating [superb-awkward]',
        'You got dating with your crush [superb-deredere]',
        'You reached the top 100 scoreboard on your last exam [genius]',
        'You reached the top -100 scoreboard on your last exam [idiot]',
        'You got a recommendation [superb-genius]',
        'You got expelled from school [super-idiot]'
        ]

        msg.say(`⚠️ Alpha Feature ⚠️`)
        msg.say(`⚠️ Not Intended to be Pleasurable ⚠️`)

        const results = bedlak[getRandInt(bedlak.length)]
        const startOffset = results.indexOf('[')
        const endOffset = results.indexOf(']')
        const trait = results.slice(startOffset+1, endOffset)
        const fate = results.slice(0, startOffset)
        msg.say(fate)
        // const trait = 'Fuee'
        assignRoles(trait.toString())
    }
}