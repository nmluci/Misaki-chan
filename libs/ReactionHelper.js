console.log('[ReactionHelper Module] Sucessfully Loaded')
let page

module.exports = class ReactionHelper {
    static async embedReaction(msg, embed, item, botId=370928525919780866) {
        let m = await msg.say(embed)
        this.readReaction(botId, m)
        this.backwardReaction(botId, m)
        this.deleteReaction(botId, m)
        this.forwardReaction(botId, m)
    }
    
    static async deleteReaction(botId, msg) {
        await msg.react('🔴')
        const deleteFilter = (reaction, user) => reaction.emoji.name === '🔴' && user.id !== botId
        const deletes = msg.createReactionCollector(deleteFilter)

        deletes.on('collect', d => {
            return msg.delete()
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

    static async forwardReaction(botId, msg, doujin=false) {
        await msg.react('➡')
        const forwardFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id !== botId
        const forward = msg.createReactionCollector(forwardFilter)

        forward.on('collect', f => {
            f.remove(msg.author.id)
            return msg.say('Not yet Implemented')
        })
    }

    static async backwardReaction(botId,msg) {
        await msg.react('⬅')
        const backwardFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id !== botId
        const backward = msg.createReactionCollector(backwardFilter)

        backward.on('collect', b => {
            return msg.say('Not yet Implemented')
        })
    }

    static async forwardTenReaction(botId, msg) {
        await msg.react('➡')
        const forwardTenFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id !== botId
        const forwardTen = msg.createReactionCollector(forwardTenFilter)

        forwardTen.on('collect', ft => {
            return msg.say('Not yet Implemented')
        })
    }

    static async backwardTenReaction(botId,msg) {
        await msg.react('⬅')
        const backwardTenFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id !== botId
        const backwardTen = msg.createReactionCollector(backwardTenFilter)

        backwardTen.on('collect', b => {
            return msg.say('Not yet Implemented')
        })
    }
}