const { Command } = require('discord.js-commando')
const request = require('node-superfetch')
const GameAssets = require('../../libs/GameAssets')
const Utils = require('../../libs/Utils')
const { getRandInt } = require('../../libs/Utils')
const { MessageEmbed } = require('discord.js')
const subreddit = [
    "asiansgonewild",
    "petitegonewild",
    "legalteens",
    "xsmallgirls",
    "porngif",
    "porngifs",
    "collared",
    "gwcumsluts",
    "blowjobs",
    "cumsluts",
    "bondage",
    "shorthairchicks",
    "slut",
    "tailplug",
    "girlkissing",
    "straponlesbians",
    "lesbians",
    "lesbians_gifs"
]

module.exports = class RedditSearchCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'porn',
            aliases: ['porn', 'p'],
            group: 'search',
            memberName: 'porn',
            description: 'Sastify ur lust...?',
            args: [
                {
                    key: 'subreddit',
                    prompt: 'subreddit',
                    type: 'string',
                    default: () => subreddit[Utils.getRandInt(subreddit.length)],
                    parse: subreddit => subreddit.toLowerCase()
                }
            ]
        })
    }

    async run(msg, { subreddit }) {
        let ctx_array = []
        let list_array = []
        ctx_array.length = 0
        list_array.length = 0


        try{

            async function getPost(subreddit) {
                let icon = null
                const { body } = await request
                .get(`https://www.reddit.com/r/${subreddit}/new.json`)
                .query({ limit: 100 });
                console.log(`[CURRENT REDDIT] ${subreddit}`)
                // console.log(body.data.children)
                if (!body.data.children.length) return
                for (let i=0; i < body.data.children.length; i++) {
                    if (body.data.children[i].data.post_hint == 'image')
                    ctx_array.push(body.data.children[i].data.url)
                    list_array.push(body.data.children[i].data.title)
                }
                const rand = getRandInt(list_array.length)
                return {image: ctx_array[rand], title: list_array[rand]}
            }
            
            async function fetchIcon(subreddit) {
                const { body } = await request.get(`https://www.reddit.com/r/${subreddit}/about.json`)
                if(!body.data.icon_img && !body.data.community_icon) return
                return body.data.icon_img || body.data.community_icon.replace(/\?.+/, '')
            }

            const icon = await fetchIcon(subreddit)
            const redData = await getPost(subreddit)

            const redditEmbed = new MessageEmbed()
            .setAuthor(`r/${subreddit}`, icon)
            .setColor('#CCCCFF')
            .setImage(redData.image)
            .setTitle(redData.title)
            .setFooter('Hmm...')
            msg.say(redditEmbed)
        } catch (err) {
            msg.say('Not Found?')
            return console.log(err)
        }
    }
}