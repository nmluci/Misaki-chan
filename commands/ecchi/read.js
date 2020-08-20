const { Command } = require('discord.js-commando')
const GameAssets = require('../../libs/GameAssets')
const HentaiHelper = require('../../libs/HentaiHelper')

module.exports = class ReadHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'read',
            aliases: ['r'],
            group: 'ecchi',
            memberName: 'read',
            description: 'Read a *sauce*',
            args: [
                {
                    key: "sauce",
                    prompt: 'sauce pls',
                    type: "integer"
                }
            ],
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES']
        });
    }

    async run(msg, {sauce}) {
        try{
            const currentRoles = GameAssets.genRoles()
            let memberRoles
            // console.log(masterGuild)
            
            // enumerating member's roles
            if (msg.member.roles.cache.some( x => currentRoles.indexOf(x.name) >= 0 )) {
                for (let i=0; i < currentRoles.length; i++) {
                    const x = msg.member.roles.cache.find(x => x.name == currentRoles[i])
                    // console.log('Roles', x)
                    if (x) memberRoles = x.name
                }
            }
            // give appropriate responses
            if (memberRoles) {
                if (memberRoles.toLowerCase().includes('awkward')) msg.say(`You must be feeling so awkwards that you decided to find a ${tags} hentai...\nwut a degenerate`)
                if (memberRoles.toLowerCase().includes('idiot')) {
                    msg.say(`Why don't you instead learn some stuff to fix that idiotness of yours huh? ${msg.author}`)
                    return
                }
                if (memberRoles.toLowerCase().includes('genius')) msg.say(`Don't forget to keep ur self as a ${memberRoles}, okay?`)
            }
    
            sauce = sauce.toString()
            let res = await HentaiHelper.getById(sauce);
            await HentaiHelper.makeDoujinEmbed(res, msg.channel)

        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return msg.say(`Not Found (likely)`)
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