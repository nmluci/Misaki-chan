const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { verify } = require('../../libs/Utils');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['h'],
            group: 'admin',
            memberName: 'help',
            description: 'Probably your only commands that i will accept',
            hidden: true,
            args: [
                {
                    key: 'cmd',
                    prompt: 'Gimme da command!',
                    type: 'string',
                    default: 'all'
                }
            ]
        });
    }

    async run(msg, { cmd }) {
        try {
            let page = 0
            let ctx
            let cmdname 
            let botId = 370928525919780866
            let help = ' '
            // Declare currently available commands groups
            let cmdgrp = this.client.registry.groups
            let maxpage = cmdgrp.keyArray().length
            let grpkeys = cmdgrp.keyArray()
        
            // Initial Embed Form
            let helpEmbed = new MessageEmbed()
            .setAuthor('Misaki-chan', `https://i.imgur.com/OFC149y.png`)
            .setColor('#ccccff')
    
            // Caches the Embed Object
            let m = await msg.say(helpEmbed)
            // Initiates the function and then fetch the result
            await makeList(m, helpEmbed, cmdgrp)
            async function getReaction (msg, m) {
                try {
                    await m.react('⬅')
                    await m.react('🔴')
                    await m.react('➡')
                    // Reaction Filter
                    const forwardFilter = (reaction, user) => reaction.emoji.name === '➡' && !user.bot
                    const deleteFilter = (reaction, user) => reaction.emoji.name === '🔴' && !user.bot
                    const backwardFilter = (reaction, user) => reaction.emoji.name === '⬅' && !user.bot
                    // Reaction Responses
                    const deletes = msg.createReactionCollector(deleteFilter, { maxUsers: 2 })
                    const forwards = msg.createReactionCollector(forwardFilter, { maxUsers: 2 })
                    const backwards = msg.createReactionCollector(backwardFilter, { maxUsers: 2 })
                    // Reaction Emit Event
                    deletes.on('collect', async dmsg => {
                        await m.delete()
                        deletes.stop()
                        msg.say("Done~")
                    })
                    forwards.on('collect', async fmsg => {
                        if (page === maxpage) return await fmsg.users.remove(fmsg.users.cache.filter(x => !x.bot).id)
                        page+=1
                        console.log("nmri")
                        await fmsg.users.remove(fmsg.users.cache.filter(x => !x.bot).id)
                        makeList(m, helpEmbed, cmdgrp)
                        forwards.stop()
                        backwards.stop()
                    })
                    backwards.on('collect', async bmsg => {
                        if (page === 0) return await bmsg.users.remove(bmsg.users.cache.filter(x => !x.bot).id)
                        page-=1
                        await bmsg.users.remove(bmsg.users.cache.filter(x => !x.bot).id)
                        makeList(m, helpEmbed, cmdgrp)
                        forwards.stop()
                        backwards.stop()
                    })
                } catch (err) {
                    msg.say(`[ERROR] ${err}`)
                    return console.log(`[ERROR] ${err}`)
                }
            }
    
            async function makeList (msg, embed, data) {
                console.log(`Page: ${page}`)
                if (help.length > 0) help = ' '
                let grp = data.get(data.keyArray()[page])
                let name = grp.id
                let grpname = grp.name
                ctx = grp.commands
                .filter(x => x.ownerOnly != true)
                .filter(x => x.guildOnly != true)
                .filter(x => x.hidden != true)
                cmdname = ctx.keyArray()
                
                embed.setTitle(`${name} (${grpname})`)
                for (let i in cmdname) {
                    let x = cmdname[i]
                    let name = ctx.get(x).name
                    let dsc = ctx.get(x).description
                    help += (`**${name}** (${ctx.get(x).aliases[0] ? ctx.get(x).aliases : "No Aliases"})\n${dsc}\n\n`)
                }
                // console.log(help)
                embed.setDescription(help)
                await m.edit(embed)
                await getReaction(msg, m)
            }
            // Reaction-based navigaton
            // Reaction Init
            
        } catch (err) {
            return console.log(`[ERROR] ${err}`)
        }    
    }

    async onBlock(msg, reason) {
        if (reason == "permission") {
            await msg.say(`Apparently, you don't assigned me with ${response}.`)
        }
    }
}