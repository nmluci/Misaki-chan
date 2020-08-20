const { Command } = require('discord.js-commando');
const Utils = require('../../libs/Utils')
const GameAssets = require('../../libs/GameAssets')
const HentaiHelper = require('../../libs/HentaiHelper')
const { tsundere, deredere, slave, ero } = require('../../libs/Personality') 

module.exports = class TagsHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tags',
            aliases: ['t'],
            group: 'ecchi',
            memberName: 'tags',
            description: 'Search for **doujin** by anything...',
            args: [
                {
                    key: "tags",
                    prompt: 'tags',
                    type: "string"
                }
            ],
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES', 'EMBED_LINKS']
        });
    }
    async run(msg, {tags}) {
        try {
            
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
                if (memberRoles.includes('TS')) {
                    console.log(tags)
                    if (tags.toLowerCase().includes('genderbender')) msg.say(`Soooo, you still ain't sastified by your new self huh? well its fine for me though...`)
                    if (tags.toLowerCase().includes('yuri')) msg.say('Hmm... so you are into that kind of thing eh?')
                    if (tags.toLowerCase().includes('yaoi')) msg.say(`SO...\nyou have accepted your fate...\nit's good to hear(?)`)
                }
                if (memberRoles.toLowerCase().includes('deredere')) {
                    if (tags.toLowerCase().includes('ntr')) msg.say(`Seriously? That's your fetish?`)
                    if (tags.toLowerCase().includes('yuri')) msg.say('Okay...')
                    if (tags.toLowerCase().includes('yaoi')) msg.say('...')
                }
                if (memberRoles.toLowerCase().includes('goshuujin')) {
                    if (tags.toLowerCase().includes('maid')) msg.say('ご主人様、激しくしないよね？')
                    if (tags.toLowerCase().includes('slave')) msg.say('あたし、ご主人様の奴隷になります、永遠に')
                    if (tags.toLowerCase().includes('prostitution')) msg.say('いやあああああああああああああだ、お願いご主人、それだけはダメ')
                }
                if (memberRoles.toLowerCase().includes('straycat')) {
                    if (tags.toLowerCase().includes('prostitution')) msg.say(`Fuee... are you that badly wants to be a cumdumpster?`)
                    if (tags.toLowerCase().includes('maid')) msg.say(`Fuee... are you that desperately to become one's slave?`)
                    if (tags.toLowerCase().includes('slave')) msg.say(`Fuee... are you really REALLY really REALLY wAnNa tO bE a SlAvE hUh?`)
                }
            }
    
            if (memberRoles) {
                if (memberRoles.includes('tsundere')) {
                    if (tags.toLowerCase().includes('yuri')) { msg.say(tsundere.yuri) }
                    else if (tags.toLowerCase().includes('yaoi')) { msg.say(tsundere.yaoi) }
                    else if (tags.toLowerCase().includes('milf')) { msg.say(tsundere.milf) }
                    else if (tags.toLowerCase().includes('dilf')) { msg.say(tsundere.dilf) }
                    else if (tags.toLowerCase().includes('loli')) { msg.say(tsundere.loli) }
                } else if (memberRoles.includes('deredere')) {
                    if (tags.toLowerCase().includes('yuri')) { msg.say(deredere.yuri) }
                    else if (tags.toLowerCase().includes('yaoi')) { msg.say(deredere.yaoi) }
                    else if (tags.toLowerCase().includes('milf')) { msg.say(deredere.milf) }
                    else if (tags.toLowerCase().includes('dilf')) { msg.say(deredere.dilf) }
                    else if (tags.toLowerCase().includes('loli')) { msg.say(deredere.loli) }
                } else if (memberRoles == 'goshuujin') {
                    if (tags.toLowerCase().includes('yuri')) { msg.say(slave.yuri) }
                    else if (tags.toLowerCase().includes('yaoi')) { msg.say(slave.yaoi) }
                    else if (tags.toLowerCase().includes('milf')) { msg.say(slave.milf) }
                    else if (tags.toLowerCase().includes('dilf')) { msg.say(slave.dilf) }
                    else if (tags.toLowerCase().includes('loli')) { msg.say(slave.loli) }
                } else {
                    if (tags.toLowerCase().includes('yuri')) { msg.say(ero.yuri) }
                    else if (tags.toLowerCase().includes('yaoi')) { msg.say(ero.yaoi) }
                    else if (tags.toLowerCase().includes('milf')) { msg.say(ero.milf) }
                    else if (tags.toLowerCase().includes('dilf')) { msg.say(ero.dilf) }
                    else if (tags.toLowerCase().includes('loli')) { msg.say(ero.loli) }
                }
            } else {
                if (tags.toLowerCase().includes('yuri')) { msg.say(ero.yuri) }
                else if (tags.toLowerCase().includes('yaoi')) { msg.say(ero.yaoi) }
                else if (tags.toLowerCase().includes('milf')) { msg.say(ero.milf) }
                else if (tags.toLowerCase().includes('dilf')) { msg.say(ero.dilf) }
                else if (tags.toLowerCase().includes('loli')) { msg.say(ero.loli) }
            }
            
            tags = tags.toString()
            //Censorship to ensure all actor are above 18
            if (tags.toLowerCase().includes('brainfuck')) tags = tags.replace('brainfuck', 'yaoi')
    
            let meta_res = await HentaiHelper.getByTags(tags)
            console.log(meta_res)
            await HentaiHelper.makeDoujinEmbed(meta_res, msg.channel)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            msg.say('Not found (likely)')
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