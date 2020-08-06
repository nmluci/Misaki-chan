
module.exports = class ReactionHelper {
    botId = 370928525919780866

    async getReaction (msg, m) {
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

    async makeList (msg, embed, data) {
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
}