

module.exports = class ReactionHelper {
    static async embedReaction(client, msg, embed , botId='370928525919780866') {
        m = await msg.say(embed)
        globalEmbed = embed
        cmdarr = client.registry.groups
        cmdkeys = cmdarr.keyArray()
        arr = cmdkeys[page]
        item = cmdarr.get(arr)
        console.log(item, typeof(item))
        content = item.get(item.keyArray()[page=1]).commands.filter(x => x.ownerOnly != true && x.hidden != true)
        cmdname = item.get(item.keyArray()[page=1]).commands.filter(x => x.ownerOnly != true && x.hidden != true).keyArray()
        embed.setTitle(item.keyArray()[page=1])

        for (let i = 0; i < cmdname.length; i++) {
            let x = cmdname[i]
            let name = content.get(x).name
            let desc = content.get(x).description
            embed.addField(`${name} (${content.get(x).aliases ? content.get(x).aliases : 'No Alias'})`, desc, true)
        }

        m.edit(embed)

        async function forwardReaction() {
            await m.react('➡')
            const forwardFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id !== botId
            const forward = msg.createReactionCollector(forwardFilter)
    
            forward.on('collect', f => {
                page++
                content = item.get(item.keyArray()[page=1]).commands.filter(x => x.ownerOnly != true && x.hidden != true)
                cmdname = item.get(item.keyArray()[page=1]).commands.filter(x => x.ownerOnly != true && x.hidden != true).keyArray()
                globalEmbed.setTitle(item.keyArray()[page=1])
    
                for (let i = 0; i < cmdname.length; i++) {
                    let x = cmdname[i]
                    let name = content.get(x).name
                    let desc = content.get(x).description
                    globalEmbed.addField(`${name} (${content.get(x).aliases ? content.get(x).aliases : 'No Alias'})`, desc, true)
                }
                return m.edit()
            })
        }

        await forwardReaction()
    }
    
    static async deleteReaction(botId, msg) {
        await msg.react('🔴')
        const deleteFilter = (reaction, user) => reaction.emoji.name === '🔴' && user.id !== botId
        const deletes = msg.createReactionCollector(deleteFilter)

        deletes.on('collect', async d => {
            await msg.delete()
            return await msg.say(`U c notin'`)
        })

    }
    
    static async readReaction(botId, msg) {
        await msg.react('📖')
        const readFilter = (reaction, user) => reaction.emoji.name === '📖' && user.id !== botId
        const reads = msg.createReactionCollector(readFilter)

        reads.on('collect', async d => {
            // console.log(d.users.cache.filter(x => !x.bot))
            await d.users.remove(d.users.cache.filter(x => !x.bot).id)
            await console.log(d.users.cache)
            return msg.say('Not yet Implemented')
        })
    }
    
    static async downloadReaction(botId, msg) {
        await msg.react('💾')
        const downloadFilter = (reaction, user) => reaction.emoji.name === '💾' && user.id !== botId
        const downs = msg.createReactionCollector(downloadFilter)

        downs.on('collect', d => {
            return msg.say('Not yet Implemented')
        })
    }

    static async forwardReaction(botId, msg) {
        
    }

    static async backwardReaction(botId, msg, page) {
        await msg.react('⬅')
        const backwardFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id !== botId
        const backward = msg.createReactionCollector(backwardFilter)

        backward.on('collect', b => {
            return msg.say('Not yet Implemented')
        })
    }

    static async forwardTenReaction(botId, msg, page) {
        await msg.react('➡')
        const forwardTenFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id !== botId
        const forwardTen = msg.createReactionCollector(forwardTenFilter)

        forwardTen.on('collect', ft => {
            return msg.say('Not yet Implemented')
        })
    }

    static async backwardTenReaction(botId,msg, page) {
        await msg.react('⬅')
        const backwardTenFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id !== botId
        const backwardTen = msg.createReactionCollector(backwardTenFilter)

        backwardTen.on('collect', b => {
            return msg.say('Not yet Implemented')
        })
    }
}