const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const ReactionHelper = require('../../libs/ReactionHelper')
module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fu',
            aliases: ['h'],
            group: 'admin',
            memberName: 'fu',
            description: 'Probably your only commands that i will accept',
            guarded: true,
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
        const botId = this.client.user.id
        try {
            let cmdgrps = this.client.registry.groups
            let grpkeys = cmdgrps.keyArray()
            // console.log(this.client.registry.groups.get('ecchi'))
            let fHelp = new MessageEmbed()
            .setAuthor('Misaki-chan', `https://i.imgur.com/OFC149y.png`)
            .setColor('#b16ffc')
            // for (let i=0;i<grpkeys.length;i++) {
            //     let x = grpkeys[i]
            //     fHelp.addField(x, cmdgrps.get(x).commands.keyArray())
            // }
            // let m = await msg.say('fucc')
            ReactionHelper.embedReaction(msg, fhelp, cmdgrps)
        } catch (err) {
            msg.say(`Err0r?`)
            return console.log(`[ERROR] ${err}`)
        }
    }
};