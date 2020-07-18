const { Command } = require('discord.js-commando')
const { tsundere, deredere, slave, ero} = require('../../libs/Personality')
const GameAssets = require('../../libs/GameAssets')
const HentaiHelper = require('../../libs/HentaiHelper')
const Utils = require('../../libs/Utils')
const { MessageEmbed } = require('discord.js')

let doujinScore = 0

module.exports = class RateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rate',
            group: 'waifu',
            memberName: 'rate',
            description: 'rate doujin or anything',
            nsfw: true,
            args: [
                {
                    key: 'code',
                    type: 'integer',
                    prompt: 'enter code to rate'
                }
            ],
            clientPermissions: ['MANAGE_MESSAGES']
        })
    }

    async run(msg, { code }) {
        code = code.toString()
        let doujin = await HentaiHelper.getById(code)
        console.log(doujin)
        let evalScore

        let currentRoles = GameAssets.genRoles()
        let memberRoles

        // Enumerates member's roles
        if (msg.member.roles.cache.some(x => currentRoles.indexOf(x.name) >= 0)) {
            for (let i = 0; i < currentRoles.length; i++) {
                const x = msg.member.roles.cache.find(x => x.name == currentRoles[i])
                if (x) memberRoles = x.name
            }
        }
        
        let metadata = {}
        metadata.title = doujin.title
        metadata.sauce = doujin.id
        metadata.tag = doujin.tags.filter(x => x.type == 'tag').map(x => Utils.toPlural(x.name));
        
        for (let i = 0; i < metadata.tag.length; i++) {
            let x = metadata.tag[i].toLowerCase()
            if (x == 'rape' || x == 'mother' || x == 'father' || x == 'bestiality' || x == 'old man') doujinScore -= 20
            if (x == 'milf' || x == 'dilf') doujinScore -= 10
            if (x == 'yuri' || x == 'lesbian' || x == 'female only') doujinScore += 20
            if (x == 'vanilla' || x == 'lolicon' || x == 'small breasts') doujinScore += 30
            if (x == 'mmf' || x == 'mff' || x == 'threesome' || x == 'ffm threesome' || x == 'mmf threesome' || x == 'bbm') doujinScore += 15
            if (x == 'yaoi' || x == 'tomgirl' || x == 'gender bender' || x  == 'genderbender' || x == 'tomboy') doujinScore += 25
            if (x == 'prostitution' || x == 'slave' || x == 'bondage' || x == 'group' || x == 'bdsm' || x == 'beauty mark' || x == 'blindfold' || x == 'gag' || x == 'collar' || x == 'crotch tattoo') doujinScore += 23
            if (x == 'creampie' || x == 'nakadashi' || x == 'blowjob' || x == 'boobjob' || x == 'paizuri' || x == 'cunnilingus') doujinScore += 22
            if (x == 'sole female' || x == 'masturbation' || x == 'story arc' || x == 'virginity' || x == 'exhibitionism') doujinScore += 23
            if (x == 'body swap' || x == 'mind break' || x == 'mindbreak' || x == 'feminization' || x == 'maid' || x == 'crossdressing' || x == 'sex toys' || x  == 'breast expansion' || x == 'mind control' || x == 'mind control') doujinScore += 35
            if (x == 'sister' || x == 'incest') doujinScore += 40
        }
        
        if (doujinScore > 1000) evalScore = doujinScore/100
        if (doujinScore > 100) evalScore = doujinScore/10 + 30
        if (doujinScore < 100) evalScore = doujinScore
        
        let prompt
        if (memberRoles.includes('tsundere')) {
            prompt = tsundere.misc.replace('KW', evalScore)
        } else if (memberRoles.includes('deredere')) {
            prompt = deredere.misc.replace('KW', evalScore)
        } else if (memberRoles == 'goshuujin') {
            prompt = slave.misc.replace('KW', evalScore)
        } else {
            prompt = ero.misc.replace('KW', evalScore)
        }

        let scoreEmbed = new MessageEmbed()
        .setAuthor('Misaki Doujin Analyzer')
        .setTitle(metadata.title.pretty)
        .setColor('#CCCCFF')
        .setFooter(metadata.sauce)
        if (metadata.tag[0]) scoreEmbed.addField('Tags', metadata.tag[0] ? metadata.tag.join(', ') : metadata.tag)
        await msg.say(scoreEmbed)
        await msg.say(prompt)
    }
} 