const { Command } = require('discord.js-commando');
const NanaAPI = require('nana-api');
const { MessageEmbed } = require('discord.js');
let hentai_api = new NanaAPI();
const TYPE = {
    j: 'jpg',
    p: 'png',
    g: 'gif'
};


module.exports = class TagsHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tags',
            aliases: ['t'],
            group: 'ecchi',
            memberName: 'tags',
            description: 'Sastifies your lust',
            args: [
                {
                    key: "tags",
                    prompt: 'Ehm',
                    type: "string"
                }
            ],
            nsfw: true,
            clientPermissions: ['MANAGE_MESSAGES', 'EMBED_LINKS']
        });
    }
    run(msg, {tags}) {
        tags = tags.toString()

        //Censorship to ensure all actor are above 18
        if (tags.toLowerCase().includes('brainfuck')) tags = tags.replace('brainfuck', 'yaoi')
        if (tags.toLowerCase().includes('loli')) msg.say('Lolicon... _eww')
        if (tags.toLowerCase().includes('milf')) msg.say('ara ara')
        if (tags.toLowerCase().includes('shounen ai') || tags.toLowerCase().includes('shounenai')) msg.direct('Are you one of my Master friends?')
        if (tags.toLowerCase().includes('Big Oppai')) msg.direct('Normies')
        // console.log(tags, typeof(tags))
        // console.log('lol')
        
        ParseList(tags)
        function getRandInt(int)
        {
        return Math.floor(Math.random() * int);
        }
        
        async function ParseList(tags) {
            let list = await getList(tags);
            let parsed = {};
            let numpages = list.num_pages;
            let id = await hentai_api.look(tags, getRandInt(numpages));
            await getInfo(id.results.find(x => x.language == 'english').id)
            
        }

        let book = new MessageEmbed()
        .setColor('#65fcbd');

        function getList(tags) {
            return new Promise( async (fullfill, reject) => {
                try {
                    fullfill(hentai_api.look(tags))
                } catch (err) {
                    reject (err)
                }
            })
        }

        function toPlural(str)
            {
                let arr = str.toLowerCase().split('');
                arr[0] = arr[0].toUpperCase();
                return arr.join('');
            }
        
        function getById(id) {
            return new Promise( async (fullfill, reject) => {
                try{
                    fullfill(hentai_api.g(id))
                } catch (err) {
                    reject (err)
                }
            })    
        }
        
        async function getInfo(tags) {
            
            let res = await getById(tags);
            // console.log(res)
            let json = {};
            json.tag = res.tags.filter(x => x.type == 'tag').map(x => toPlural(x.name));
            json.category = res.tags.filter(x => x.type == 'category').map(x => toPlural(x.name));
            json.artist = res.tags.filter(x => x.type == 'artist').map(x => toPlural(x.name));
            json.parody = res.tags.filter(x => x.type == 'parody').map(x => toPlural(x.name));
            json.character = res.tags.filter(x => x.type == 'character').map(x => toPlural(x.name));
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
            msg.say(book).then(msg.say('ごゆっくり～'))
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