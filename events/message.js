const { Collection } = require("discord.js");
const { msgFilter } = require('../libs/Message/MessageFilter')
const { mention_spam } = require('../libs/Message/Mention')
const { emoji_cx } = require('../libs/Message/Emoji')
const { getRandInt } = require('../libs/Utils')

// Might gonna reworked this whole function
module.exports = async (client, msg) => {
    // console.log(msg)
    // console.log(msg.guild.id)
    if (msg.author.bot) return
    if (msg.guild.id != 537585020219555850) {
        await msgFilter(client, msg)
        await mention_spam(client, msg)
        await emoji_cx(client, msg)
        
        if (msg.content.toLowerCase().includes('fue')) {
            if (msg.author == 360824982789685248n) {
                msg.channel.send('Fuee')
            }
        }
        
        if (msg.content) {
            const lucc = getRandInt(10000)
            
            if (lucc == '1') {
                msg.channel.send({
                    files: ['https://i.imgur.com/t57h37K.png']
                })
            }  
        }
        
        
    }
}
