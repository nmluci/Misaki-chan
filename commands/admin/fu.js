const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { verify } = require('../../libs/Utils');

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['h'],
            group: 'admin',
            memberName: 'hel',
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
            let page = 1
            let ctx
            let cmdname 
            let botId = 370928525919780866
            // Declare currently available commands groups
            let cmdgrp = this.client.registry.groups
            let grpkeys = cmdgrp.keyArray()
        
            // Initial Embed Form
            let helpEmbed = new MessageEmbed()
            .setAuthor('Misaki-chan', `https://i.imgur.com/OFC149y.png`)
            .setColor('#ccccff')
    
            // Caches the Embed Object
            let m = await msg.say(helpEmbed)
    
            // Initiates the function and then fetch the result
            await makeList(m, helpEmbed, cmdgrp)
    
            async function makeList (msg, embed, data) {
                let grp = data.get(data.keyArray()[page-1])
                let name = grp.id
                let grpname = grp.name
                let maxpage = data.keyArray().length
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
                    embed.addField(`${name} (${ctx.get(x).aliases ? ctx.get(x).aliases : "No Aliases"})`, dsc)
                }
                m.edit(embed)
    
                // const n = await msg.say(`Enter h + next for next page, prev for previous page, delete for delete page`)
                // let ans = await verify(msg.channel, 'h')
    
                // if ( ans ) {
                //     await n.delete()
                // }
                // // return the selected choices (TEMP)
                // switch (ans) {
                //     case ('prev'):
                //         if (page == 1) return msg.say("Fucc ma layf")
                //         page--
                //         makeList(m, embed, data)
                //         break
                //     case ('next'):
                //         page++
                //         makeList(m, embed, data)
                //         break
                //     case ('delete'):
                //         return m.delete()
                //         break
                //     default:
                //         return msg.say("Sloot")
                // }
                // // console.log(name, cmd)
    
                // Reaction-based navigaton
                // Reaction Init
                await m.react('⬅')
                await m.react('🔴')
                await m.react('➡')
                // Reaction Filter
                const deleteFilter = (reaction, user) => reaction.emoji.name === '🔴' && user.id != botId
                const forwardFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id != botId
                const backwardFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id != botId
                // Reaction Responses
                const deletes = msg.createReactionCollector(deleteFilter)
                const forwards = msg.createReactionCollector(forwardFilter)
                const backwards = msg.createReactionCollector(backwardFilter)
                // Reaction Emit Event
                
                deletes.on('collect', async dmsg => {
                    await m.delete()
                    return msg.say("U C NULL")
                })
                forwards.on('collect', async fmsg => {
                    if (page == maxpage) return msg.say('shit')
                    page++
                    await fmsg.users.remove(fmsg.users.cache.filter(x => !x.bot).id)
                    makeList(m, embed, data)
                })
                backwards.on('collect', async bmsg => {
                    if (page == 0) return msg.say('stfu')
                    page--
                    await bmsg.users.remove(bmsg.users.cache.filter(x => !x.bot).id)
                    makeList(m, embed, data)
                })
            }
            
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