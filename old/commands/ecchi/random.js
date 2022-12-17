const { Command } = require('discord.js-commando');
const GameAssets = require('../../libs/GameAssets')
const HentaiHelper = require('../../libs/HentaiHelper')

module.exports = class RandHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            aliases: ['rand'],
            group: 'ecchi',
            memberName: 'random',
            description: 'Sastify your lust with random **doujin**',
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES']
        });
    }

    async run(msg) {
        try {
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
    
            if (assignedRoles == 'idiot' || assignedRoles == 'superb-idiot') {
                msg.say('Fufufu, You are to dumb to degenerate yourself further more!')
                return
            }
            
            let meta_res = await HentaiHelper.getRandom()
            await HentaiHelper.makeDoujinEmbed(meta_res, msg.channel)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            msg.say(`Not Found (likely)`)
            return 1
        }
    }

    onBlock(msg, reason) {
        if (reason == 'nsfw') {
            msg.say('きゃぁ～、はげしくしないでよ…、あたし、いっちゃううから～')
        }
        if (reason == 'clientPermissions') {
            msg.say('Urghh, もう我慢できない！')
        }
    }
};