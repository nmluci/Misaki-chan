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

        async function changeNickname(name) {
            msg.member.setNickname(name)
            msg.say(`Tada~, Your name now is ${name}!`)
            msg.say(`It's perma-Nickname btw`)
            msg.say({
                files: [
                    'https://i.imgur.com/NOOyUD1.png'
                ]
            })
        }

        async function assignRoles(roles) {
            roles = roles.toString()
            const assignedRoles = msg.guild.roles.cache.find(role => role.name == roles)
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
                            color: '#090909'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'superb-idiot') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#000000'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'straycat') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#42c8f5'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'superb-straycats') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#42f0f5'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'TS') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#62ff4a'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                    changeNickname(`${msg.author.username}` + `-chan`)
                }
                if (roles == 'goshuujin') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#cf5eff'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                if (roles == 'isekai') {
                    msg.guild.roles.create({
                        data: {
                            name: roles,
                            color: '#5effaf'
                        }
                    }).then(function (roles) {
                        msg.member.roles.add(roles)
                    })
                }
                
            } else {
                // msg.say('Roles Exist!')
                // Fixed Roles Assignment as apparenly its not properly configured last time
                msg.member.roles.add(assignedRoles)
                if (assignRoles == 'TS') changeNickname(`${msg.author.username}` + `-chan`)
            }
            return msg.say(`Congrats ${msg.author}, you got ${roles} roles. Be sure to treasure it nicely!`)
        }
        
        const commonEvent = [
        'You fell from your seat while sleeping in the class [awkward]',
        'Your crush sees you doing miserable things [awkward]',
        'You cry really loud that your crush noticed and wipe off your tears [superb-awkward]',
        'You found out that your crush already dating [superb-awkward]',
        'You met your crush in the pathway to school [deredere]',
        'Your crush encourage you for your upcoming match [deredere]',
        'Your crush confessed to you [superb-deredere]',
        'You got dating with your crush [superb-deredere]',
        'You reached the top 100 scoreboard on your last exam [genius]',
        'Your physics teacher so amazed by your knowledge so he decided to left the school embarrassedly [genius]',
        'You got your Ph.D although you not even graduated from your highschool... yet (?) [superb-genius]',
        'You got a recommendation [superb-genius]',
        'You reached the top -100 scoreboard on your last exam [idiot]',
        'You got expelled from school [superb-idiot]',
        'You got evicted from you family [straycat]',
        'You fell out the cliff... or thats what are you thinks happened, while in reality you actually fell of the plane [superb-straycat]',
        'You got hit by the Truck-san [isekai]',
        'You found a gender-change potion [TS]',
        'You found a secret code to control me [goshuujin]'
        ]

        msg.say(`⚠️ Alpha Feature ⚠️`)
        msg.say(`⚠️ Not Intended to be Pleasurable ⚠️`)

        const results = commonEvent[getRandInt(commonEvent.length)]
        const startOffset = results.indexOf('[')
        const endOffset = results.indexOf(']')
        const trait = results.slice(startOffset+1, endOffset)
        const fate = results.slice(0, startOffset)
        msg.say(fate)
        // const trait = 'Fuee'
        assignRoles(trait.toString())
    }
}