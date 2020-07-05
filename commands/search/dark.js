const { Command } = require('discord.js-commando')
const request = require('node-superfetch')
const { getRandInt } = require('../../libs/Utils')
const { MessageEmbed } = require('discord.js')

module.exports = class RedditSearchCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'dark',
            aliases: ['dark', 'd'],
            group: 'search',
            memberName: 'dark',
            description: 'Heals your darksouls...',
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES', 'EMBED_LINKS']
        })
    }

    async run(msg) {
        let ctx_array = []
        let list_array = []

        try{
            
            async function getPost() {
                let icon = null
                const { body } = await request
                .get(`https://www.reddit.com/r/darkjokes/new.json`)
                .query({ limit: 100 });
                console.log(`[CURRENT REDDIT] DARK`)
                // console.log(body.data.children)
                if (!body.data.children.length) return
                for (let i=0; i < body.data.children.length; i++) {
                    if (body.data.children[i].data.stickied == false) {
                        list_array.push(body.data.children[i].data.title)
                        ctx_array.push(body.data.children[i].data.selftext)
                    }
                }
                const rand = getRandInt(list_array.length)
                return {ans: ctx_array[rand], title: list_array[rand]}
            }
            
            async function fetchIcon() {
                const { body } = await request.get(`https://www.reddit.com/r/darkjokes/about.json`)
                if(!body.data.icon_img && !body.data.community_icon) return
                return body.data.icon_img || body.data.community_icon.replace(/\?.+/, '')
            }

            const icon = await fetchIcon()
            const redData = await getPost()

            const redditEmbed = new MessageEmbed()
            .setAuthor(`Dark JOKES`, icon)
            .setColor('#CCCCFF')
            .setTitle(redData.title)
            .setDescription(redData.ans)
            .setFooter('EhmMMmmmMMMMMmmmm... [BETA]')
            msg.say(redditEmbed)
        } catch (err) {
            return console.log(err)
        }
    }

    onBlock (msg,reason){
        if(reason == 'nsfw') return msg.say(`Next time, I gonna make ${msg.author.id} life, become dark af... `)
    }
}