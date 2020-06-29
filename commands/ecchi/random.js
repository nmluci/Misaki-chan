const { Command } = require('discord.js-commando');
const NanaAPI = require('nana-api');
const { MessageEmbed } = require('discord.js');
const Utils = require('../../libs/Utils')
const GameAssets = require('../../libs/GameAssets')
let hentai_api = new NanaAPI();

const TYPE = {
    j: 'jpg',
    p: 'png',
    g: 'gif'
};


module.exports = class RandHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            aliases: ['rand'],
            group: 'ecchi',
            memberName: 'random',
            description: 'Sastifies your lust',
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES']
        });
    }

    run(msg) {
        const masterGuild = this.client.guilds.cache.find(x => x.id == 370927823948611584).channels.cache.find(x => x.id == 726016280657657867)
        const memberRoles = msg.member.roles.cache
        const allRoles = GameAssets.genRoles()
        let assignedRoles

        if (memberRoles.some( x => allRoles.indexOf(x.name) >= 0 )) {
            for (let i=0; i < allRoles.length; i++) {
                const x = memberRoles.find(x => x.name == allRoles[i])
                // console.log('Roles', x)
                if (x) assignedRoles = x
            }
        }

        if (assignedRoles == 'idiot' || assignedRoles == 'superb-idiot') {
            msg.say('Fufufu, You are to dumb to degenerate yourself further more!')
            return
        }
        
        getInfo()
        let book = new MessageEmbed()
        .setColor('#65fcbd');
        
        function getById() {
            return new Promise( async (fullfill, reject) => {
                try{
                    fullfill(hentai_api.random())
                } catch (err) {
                    reject (err)
                }
            })    
        }
        
        async function getInfo() {
            
            let res = await getById();
            // console.log(res)
            let json = {};
            json.tag = res.tags.filter(x => x.type == 'tag').map(x => Utils.toPlural(x.name));
            json.category = res.tags.filter(x => x.type == 'category').map(x => Utils.toPlural(x.name));
            json.artist = res.tags.filter(x => x.type == 'artist').map(x => Utils.toPlural(x.name));
            json.parody = res.tags.filter(x => x.type == 'parody').map(x => Utils.toPlural(x.name));
            json.character = res.tags.filter(x => x.type == 'character').map(x => Utils.toPlural(x.name));
            json.cover = `https://t.nhentai.net/galleries/${res.media_id}/cover.${TYPE[res.images.cover.t]}`;
            json.thumb = `https://t.nhentai.net/galleries/${res.media_id}/thumb.${TYPE[res.images.cover.t]}`;
            
            let info = json;
            book.setTitle(`${res.title.pretty}`);
            book.setAuthor('Misaki nHentai Reader');
            book.setColor('#CCCCFF');
            book.setDescription(`Made by: **${info.artist[0] ? info.artist.join(', ') : info.artist}**`);
            book.setURL(`https://nhentai.net/g/${res.id}`);    
            book.setImage(info.cover);
            book.setFooter(`React with 📖 to continue reading / ${res.id}`);
            if (info.parody[0]) book.addField('Parody', info.parody[0] ? info.parody.join(`, `) : info.parody, true);
            if (info.character[0]) book.addField('Characters', info.character[0] ? info.character.join(`, `) : info.character, true);
            if (info.category[0]) book.addField('Categories', info.category, true);
            book.addField(`Pages`, res.num_pages, true);
            if (info.tag[0]) book.addField('Tags', info.tag[0] ? info.tag.join(', ') : info.tag);
            console.log(info)
            console.log(book)
            
            const masterEmbed = new MessageEmbed()
            .setTitle('Misaki nHentai Logger')
            .addField('Nuke Code ', res.id, true)
            .setDescription(info.tag[0] ? info.tag.join(', ') : info.tag)
            masterGuild.send(masterEmbed)
            
            msg.say(book).then(msg.say('ごゆっくり'))
        }
         
    }

    onBlock(msg, reason) {
        if (reason == 'nsfw') {
            msg.say('きゃぁ～、はげしくしないでよ…、あたし、いっちゃううから～')
        }
        if (reason == 'clientPermissions') {
            msg.say('Urghh, もう我慢できない！')
        }
    }
};