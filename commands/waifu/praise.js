const { Command } = require('discord.js-commando')
const GameAssets = require('../../libs/GameAssets')
const {tsundere, deredere, slave, ero} = require('../../libs/Personality')
const Utils = require('../../libs/Utils')

module.exports = class PraiseWaifuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'praise',
            aliases: ['praise'],
            group: 'waifu',
            memberName: 'praise',
            description: 'Praise me~',
            clientPermissions: ['MANAGE_MESSAGES']
        })
    }

    async run(msg) {
        // Goshuujin -> Slave
        // Deredere -> Deredere
        // TS, Isekai, default -> Ero
        // Tsundere => Tsundere
        try {
            // Initialize roles
            const currentRoles = GameAssets.genRoles()
            let memberRoles
    
            // Enumerates member's roles
            if (msg.member.roles.cache.some(x => currentRoles.indexOf(x.name) >= 0)) {
                for (let i = 0; i < currentRoles.length; i++) {
                    const x = msg.member.roles.cache.find(x => x.name == currentRoles[i])
                    if (x) memberRoles = x.name
                }
            }
            
            if (memberRoles.includes('tsundere')) {
                msg.say(tsundere.praised[Utils.getRandInt(tsundere.praised.length)])
            } else if (memberRoles.includes('deredere')) {
                msg.say(deredere.praised[Utils.getRandInt(deredere.praised.length)])
            } else if (memberRoles == 'goshuujin') {
                msg.say(slave.praised)
            } else {
                msg.say(ero.praised)
            }
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            msg.say('ERROR')
        }
    }
}