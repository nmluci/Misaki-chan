const { Command } = require('discord.js-commando')
const request = require('node-superfetch')
const { getRandInt } = require('../../libs/Utils')
const { MessageEmbed } = require('discord.js')

module.exports = class RedditSearchCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'dank',
            aliases: ['dank', 'dk'],
            group: 'search',
            memberName: 'dank',
            description: 'Ma wallet go brrrrrrrr...',
            clientPermissions: ['MANAGE_MESSAGES', 'EMBED_LINKS']
        })
    }

    async run(msg) {
        let ctx_array = []
        let list_array = []
        ctx_array.length = 0
        list_array.length = 0

        try{
            async function getPost() {
                let icon = null
                const { body } = await request
                .get(`https://www.reddit.com/r/dankmemes/hot.json`)
                .query({ limit: 100 });
                // console.log(`[CURRENT REDDIT] DANK`)
                // console.log(body.data.children)
                if (!body.data.children.length) return
                for (let i=0; i < body.data.children.length; i++) {
                    if (body.data.children[i].data.post_hint == 'image') {
                        list_array.push(body.data.children[i].data.title)
                        ctx_array.push(body.data.children[i].data.url)
                    }
                }
                const rand = getRandInt(list_array.length)
                return {image: ctx_array[rand], title: list_array[rand]}
            }
            
            async function fetchIcon() {
                const { body } = await request.get(`https://www.reddit.com/r/dankmemes/about.json`)
                if(!body.data.icon_img && !body.data.community_icon) return
                return body.data.icon_img || body.data.community_icon.replace(/\?.+/, '')
            }

            const icon = await fetchIcon()
            const redData = await getPost()

            const redditEmbed = new MessageEmbed()
            .setAuthor(`Dank Memes`, icon)
            .setColor('#CCCCFF')
            .setTitle(redData.title)
            .setImage(redData.image)
            .setFooter('Steam Wallet go BRRRRRRRRRRR')
            msg.say(redditEmbed)
        } catch (err) {
            msg.say('Not Found?')
            return console.log(`[ERROR] ${err}`)
        }
    }
}