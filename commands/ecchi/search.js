const { Command } = require('discord.js-commando');
const NanaAPI = require('nana-api');
const { MessageEmbed } = require('discord.js');
let hentai_api = new NanaAPI();
const TYPE = {
    j: 'jpg',
    p: 'png',
    g: 'gif'
};


module.exports = class SearchHentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            aliases: ['s'],
            group: 'ecchi',
            memberName: 'search',
            description: 'Sastifies your lust',
            args: [
                {
                    key: "tags",
                    prompt: 'Ehm',
                    type: "string"
                }
            ],
            nsfw: true,
            ownerOnly: true
        });
    }

    run(msg, {tags}) {
        tags = tags.toString()
        // console.log(tags, typeof(tags))
        // console.log('lol')
        
        ParseList(tags)

        async function ParseList(tags) {
            let list = await getList(tags);
            let parsed = {};

            parsed.title = list.results.filter(x => x.language == 'english').map(x => (x.title));
            console.log(parsed.title);
            if (parsed.title[0]) msg.say('1.'+parsed.title[0])
            if (parsed.title[1]) msg.say('2.'+parsed.title[1])
            if (parsed.title[2]) msg.say('3.'+parsed.title[2])
            if (parsed.title[3]) msg.say('4.'+parsed.title[3])
            if (parsed.title[4]) msg.say('5.'+parsed.title[4])
            if (parsed.title[5]) msg.say('6.'+parsed.title[5])
            if (parsed.title[6]) msg.say('7.'+parsed.title[6])
            if (parsed.title[7]) msg.say('8.'+parsed.title[7])
            if (parsed.title[8]) msg.say('9.'+parsed.title[8])
            if (parsed.title[9]) msg.say('10.'+parsed.title[9])
            msg.say('Enter da nambah')
            
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
    }
};