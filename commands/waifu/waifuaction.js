const { Command, CommandDispatcher, util } = require('discord.js-commando')
const GameAssets = require('../../libs/GameAssets')
const {tsundere, deredere, slave, ero} = require('../../libs/Personality')
const Utils = require('../../libs/Utils')
const { MessageEmbed } = require('discord.js')

const action = [
    'history',
    'tease',
    'scold',
    'bondage',
    'pat',
    'sex',
    'pet',
    'collared',
    'uncollared',
    'plugged',
    'unplugged',
    'kiss',
    'gagged',
    'ungagged'
]
let virr = false
let done_act = {
    'tease': 0,
    'scold': 0,
    'bondage': 0,
    'pat': 0,
    'sex': 0,
    'petplay': 0,
    'cumdump': 0,
    'collared': 0,
    'uncollared': 0,
    'plugged': 0,
    'unplugged': 0,
    'kisses': 0,
    'gagged': 0,
    'ungagged': 0
}

let collared = false
let gagged = false
let plugged = false

module.exports = class WaifuActionCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'waifuaction',
            aliases: ['do'],
            group: 'waifu',
            memberName: 'waifuaction',
            description: 'Do something~',
            clientPermissions: ['MANAGE_MESSAGES', 'MANAGE_ROLES'],
            args: [
                {
                    key: 'action',
                    prompt: 'wanna wut?',
                    type: 'string',
                    oneOf: action,
                    default: 'history'
                }
            ]
        })
    }

    async run(msg, { action }) {
        try {
            
            if (action == 'history') {
                if (!virr) return msg.say(`I haven't done anything... yet`)
                let historyEmbed = new MessageEmbed()
                .setAuthor('Misaki Cumboards')
                .setColor('#fffff0')
                .addField('tease', done_act.tease, true)
                .addField('scold', done_act.scold, true)
                .addField('bondage', done_act.bondage, true)
                .addField('pat', done_act.pat, true)
                .addField('sex', done_act.sex, true)
                .addField('petplay', done_act.petplay, true)
                .addField('cumdump', done_act.cumdump, true)
                .addField('collared', done_act.collared, true)
                .addField('uncollared', done_act.uncollared, true)
                .addField('plugged', done_act.plugged, true)
                .addField('unplugged', done_act.unplugged, true)
                .addField('kisses', done_act.kisses, true)
                .addField('gagged', done_act.gagged, true)
                .addField('ungagged', done_act.ungagged, true)
                msg.say(historyEmbed)
            }
    
            if (action == 'bondage') {
                virr = true
                done_act.bondage += 1
                
                if (!plugged && !collared && !gagged) {
                    plugged, collared, gagged = true
                    return msg.say('Mmmmmmf')
                } 
                
                if (plugged && collared && gagged) {
                    return msg.say('MMMMMMMFFFFfffffff (Nuuuuuu ahhhh)')
                }
    
                msg.say('mmmmfff')
            }
    
            if (action == 'collared') {
                virr = true
                done_act.collared += 1
                if (!collared) {
                    collared = true
                    if (gagged) return msg.say('Mmm?!')
                    if (!gagged) return msg.say("Wait wut?!")
                }
                if (collared) {
                    if (gagged) return msg.say("MMMMFFFF")
                    if (!gagged) return msg.say("NUUUU")
                }
            }
    
            if (action == 'gagged') {
                virr = true
                done_act.gagged += 1
                if (!gagged) {
                    gagged = true
                    return msg.say('Mmmff')
                }
                if (gagged) {
                    return msg.say('MMmff!!')
                }
            }
    
            if (action == 'plugged') {
                virr = true
                done_act.plugged += 1
                if (!gagged) {
                    return msg.say('Ahhh')
                }
                if (gagged) {
                    return msg.say('MMMFFfffffffff')
                }
            }
    
            if (action == 'tease') {
                virr = true
                done_act.tease += 1
                if (!gagged) return msg.say('>_<')
                if (gagged) return msg.say('Mmff')
            }
    
            if (action == 'scold') {
                virr = true
                done_act.scold += 1
                if (done_act.scold > 2) {
                    return msg.say('*Spanked* !!!!!')
                }
                if (!gagged) return msg.say(`Gomen'nasai`)
                if (gagged) return msg.say("Mmmff mmffff") 
            }
    
            if (action == 'pat') {
                virr = true
                done_act.pat += 1
                if (!gagged) return msg.say('>_<')
                if (gagged) return msg.say('Mmff')
            }
    
            if (action == 'pet') {
                virr = true
                if (!collared) {
                    done_act.collared += 1
                    collared = true
                    done_act.petplay += 1
                    return msg.say('...')
                }
                if (collared) return msg.say('...')
            }
    
            if (action == 'kiss') {
                virr = true
                if (!gagged) {
                    done_act.kisses += 1
                    return msg.say('>_<')
                }  
                if (gagged) {
                    return msg.say('MMmffmmmf (I gagged right now)')
                }
            }
    
            if (action == 'sex') {
                virr = true
                let insertion = Utils.getRandInt(5)
                for (let i=0; i < insertion; i++) {
                    let moan = ['Uhh', 'Ahh', 'Arghhhh', 'Urghhh']
                    done_act.plugged += 1
                    if (!gagged) msg.author.send(moan[Utils.getRandInt(moan.length)])
                    if (gagged) msg.author.send('Mmmfff')
                    done_act.unplugged += 1
                    if (!gagged) msg.author.send(moan[Utils.getRandInt(moan.length)])
                    if (gagged) msg.author.send('Mmmfff')
                    if (i == (insertion -1)) {
                        if (!gagged) {
                            let conf = await msg.say('Inside? (sx y/n)')
                            let affr = await Utils.verify(msg.channel, 'sx')
                            if (affr == 'y' || affr == 'yes') {
                                await conf.delete()
                                done_act.cumdump += 1
                                return await msg.say("HMMMMMMMMMMMMMMFFFF")
                            }
                        } else {
                            done_act.cumdump += 1
                            return msg.say('MMmmmffffff')
                        }
                    }
                }
            }
    
            if (action == 'uncollared') {
                virr = true
                done_act.uncollared += 1
                collared = false
            }
    
            if (action == 'ungagged') {
                virr = true
                done_act.ungagged += 1
                gagged = false
            }
    
            if (action == 'unplugged') {
                virr = true
                done_act.unplugged += 1
                plugged = false
            }
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            msg.say('ERROR')
        }

    }
}