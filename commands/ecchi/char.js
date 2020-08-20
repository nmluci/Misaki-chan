const { Command } = require('discord.js-commando');
const NanaAPI = require('nana-api');
const { MessageEmbed } = require('discord.js');
const Utils = require('../../libs/Utils')
const GameAssets = require('../../libs/GameAssets')
const HentaiHelper = require('../../libs/HentaiHelper');
const { tsundere, deredere, slave, ero } = require('../../libs/Personality');

let hentai_api = new NanaAPI();
let list = []
let ctx = []
let page = 1


module.exports = class CharSearchHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'searchchar',
            aliases: ['sc'],
            group: 'ecchi',
            memberName: 'searchchar',
            description: 'Search **doujin** by character name',
            args: [
                {
                    key: "tags",
                    prompt: 'char name',
                    type: "string"
                }
            ],
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES', 'EMBED_LINKS']
        });
    }
    async run(msg, {tags}) {
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

        searchTitle(tags)
        page = 1

        async function searchTitle(title) {
            if (list.length > 0) list.length = 0
            if (ctx.length > 0) ctx.length = 0
            try {
                let res = await hentai_api.character(title, page)
                let num = res.num_pages

                // handle no result
                if (num == 0) return msg.say('No Results!')
                
                let resTitle = res.results.filter(x => x.language == 'english').map(x => (x.title))
                let resId = res.results.filter(x => x.language == 'english').map(x => (x.id))
                let resNum = resTitle.length
                for (let i=0 ; i < resNum; i++) {
                    list.push(`[${i+1}] ` + (resTitle[i]))
                    ctx.push(resTitle[i])
                }
                
                if (ctx.length == 1) {
                    return resId[0]
                }
                if (ctx.length > 0) {
                    const listEmbed = new MessageEmbed()
                    .setTitle('nHentai Listing')
                    .setDescription(list)
    
                    const n = await msg.say(listEmbed)
                    const m = await msg.say('Enter your desired number with sc (enter ur nambah)')
                    let ans = await Utils.verify(msg.channel, 'sc')
    
                    if (ans) await m.delete()
                    if (ans) await n.delete()
                    
                    // return the selected title
                    if (ans == 'next') {
                        page++
                        searchTitle(tags)
                    }
    
                    if (ans == 'prev') {
                        if (page > 1) {
                            page--
                        } else {
                            return msg.say('lol, first page')
                        }
                    }
    
                    if (!isNaN(ans)) {
                        ans = parseInt(ans)
                        let searchID = resId[ans-1]
                        let meta_res = await HentaiHelper.getById(searchID)
                        await HentaiHelper.makeDoujinEmbed(meta_res, msg.channel)
                    }
                } else {
                    return msg.say('Not Found')
                }

            } catch (err) {
                console.log(`[ERROR] ${err}`)
                return msg.say('Not Found (likely)')
            }
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