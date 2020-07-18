const { Command } = require('discord.js-commando');
const NanaAPI = require('nana-api');
const { MessageEmbed } = require('discord.js');
const Utils = require('../../libs/Utils')
const HentaiHelper = require('../../libs/HentaiHelper')

let hentai_api = new NanaAPI();
let list = []
let ctx = []
let page = 1

module.exports = class SearchHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            aliases: ['s'],
            group: 'ecchi',
            memberName: 'search',
            description: 'Sastifies your lust',
            args: [
                {
                    key: "tags",
                    prompt: 'Ehm',
                    type: "string"
                }
            ],
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES']
        });
    }

    async run(msg, {tags}) {
        tags = tags.toString()
        searchTitle(tags)
        page = 1
        
        async function searchTitle(title) {
            if (list.length > 0) list.length = 0
            if (ctx.length > 0) ctx.length = 0
            try {
                let res = await hentai_api.look(title, page)
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
                const listEmbed = new MessageEmbed()
                .setTitle('nHentai Listing')
                .setDescription(list)

                const n = await msg.say(listEmbed)
                const m = await msg.say('Enter your desired number with s (enter ur nambah)')
                let ans = await Utils.verify(msg.channel, 's')

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


            } catch (err) {
                console.log(`[ERROR] ${err}`)
                return
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