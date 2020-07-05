const { Command } = require('discord.js-commando')
const VNDB = require('vndb-api')
const { MessageEmbed, Collection } = require('discord.js')
const Utils = require('../../libs/Utils')
const GameAssets = require('../../libs/GameAssets')

let list = []
let ctx = []

module.exports = class VNDBSearchByTitleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vnsearchtitle',
            aliases: ['vnsearch', 'vns', 'erogesearch', 'esearch'],
            group: 'search',
            memberName: 'vnsearchtitle',
            description: 'Search Visual Novel from VNDB Listing by Title Only (Exact Title Only)',
            args: [
                {
                    key: 'title',
                    prompt: 'title you want to search for',
                    type: 'string'
                }
            ],
            clientPermissions: ['MANAGE_MESSAGES'],
            nsfw: true
        })
    }

    async run(msg, { title }) {
        // Initialized vndb-api
        const vndb = new VNDB('misaki-chan')


        // Check user's roles
        let memberRoles
        if (msg.member.roles.cache.some( x => currentRoles.indexOf(x.name) >= 0 )) {
            for (let i=0; i < currentRoles.length; i++) {
                const x = msg.member.roles.cache.find(x => x.name == currentRoles[i])
                // console.log('Roles', x)
                if (x) memberRoles = x.name
            }
        }

        if (memberRoles) {
            if (memberRoles.includes('idiot')) return msg.say('G.O.S.T.U.D.Y YOU RETARDED')
        }
        
        // Check is debugging on
        if (title == 'debug') {
            if (ctx.length == 0) msg.say('None')
            return msg.say(ctx)
        }
        const vnTitle = await searchTitle(title)
        searchExactTitle(vnTitle)
        let running = true
        // await msg.say('Task Completed')

        // Get exact data of favored title
        async function searchExactTitle(rTitle) {
            try {
                // Query the title and then destroy client
                const realRes = await vndb.query(`get vn basic,details (title = "${rTitle}")`)
                vndb.destroy()

                const orig_lang = []
                const lang = []
                let coverImage
                
                // console.log(realRes)
                
                // Empty the arrays
                if (orig_lang.length > 0) orig_lang.length = 0
                if (lang.length > 0) lang.length = 0 

                // Convert the original language to human readable
                if (realRes.items[0].orig_lang.length > 0) {
                    running = true
                    for (let i = 0; i < realRes.items[0].orig_lang.length && running; i++) {
                        if (realRes.items[0].orig_lang[i] == 'ja') orig_lang.push('Japanese')
                        if (realRes.items[0].orig_lang[i] == 'en') orig_lang.push('English') 
                        if (realRes.items[0].orig_lang[i] != 'ja' && realRes.items[0].orig_lang[i] != 'en') {
                            orig_lang.push('Other')
                            running = false
                        }
                    }
                } else {
                    orig_lang.push('UNRELEASED')
                }

                // Convert the language to human readable
                if (realRes.items[0].languages.length > 0) {
                    running = true
                    
                    for (let j = 0; j < realRes.items[0].languages.length && running; j++) {
                        if (realRes.items[0].languages[j] == 'ja') lang.push('Japanese')
                        if (realRes.items[0].languages[j] == 'en') lang.push('English') 
                        if (realRes.items[0].languages[j] != 'ja' && realRes.items[0].languages[j] != 'en') {
                            lang.push('Other')
                            running = false
                        }
                    }
                } else {
                    lang.push('UNRELEASED')
                }
                coverImage = realRes.items[0].image
                // Rare Case
                if (!realRes.items[0].original) realRes.items[0].original = realRes.items[0].title
                // console.log(coverImage)

                // Create Embed for the result
                const exactEmbed = new MessageEmbed()
                .setTitle(realRes.items[0].original)
                .setAuthor('Misaki x VNDB')
                .setColor('ccccff')
                .setImage(coverImage)
                .addField('Eng Title', realRes.items[0].title, true)
                .addField('Original Languages', orig_lang, true)
                .addField('Available Language', lang, true)
                .addField("Released Date", realRes.items[0].released, true)
                .setFooter(`Mastah is (乙女), NO DOUBT! || ${realRes.items[0].id}`)
                const DescEmbed = new MessageEmbed()
                .setTitle('Description')
                .setColor('ccccff')
                .setDescription(realRes.items[0].description)

                await msg.say(exactEmbed)
                return await msg.say(DescEmbed)

            } catch (err) {
                // debug error
                return console.log(`[ERROR] ${err}`) 
            } 
        }

        async function searchTitle(title) {
            try {
                // Empty the array
                
                if (list.length > 0) list.length = 0
                if (ctx.length > 0) ctx.length = 0
                const page = 1
                // Get query
                const res = await vndb.query(`get vn basic (search ~ "${title}")`)
                const num = res.num
                for (let i = 0; i < num; i++) {
                    list.push(`[${i+1}] ` + (res.items[i].title).toString())
                    ctx.push(res.items[i].title)
                }
                
                // Make embed
                if (ctx.length == 1) {
                    return ctx[0]
                }
                const listEmbed = new MessageEmbed()
                .setTitle('Eroge Listing')
                .setDescription(list)
                const n = await msg.say(listEmbed)
                const m = await msg.say('Enter your desired number with vns (enter ur nambah)')
                let ans = await Utils.verify(msg.channel, 'vns')
                ans = parseInt(ans)
                if (ans) await n.delete()
                if (ans) await m.delete()
                
                // return the selected title 
                return ctx[ans-1]               
                // console.log(list)
            } catch (err) {
                return console.log(`[ERROR] ${err}`)
            }
        }
    }

    onBlock(msg, reason) {
        if (reason = 'nsfw') {
            return msg.say(`Can't you tell if it only for nsfw stuff?`)
        }
    }
}