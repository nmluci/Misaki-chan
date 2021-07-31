const Utils = require('../libs/Utils');
const { MessageEmbed } = require('discord.js');
const NanaAPI = require('nana-api')
let hentai_api = new NanaAPI()
const TYPE = {
    j: 'jpg',
    p: 'png',
    g: 'gif'
};

console.log(`[HentaiHelper Module] Successfully Loaded`)
module.exports = class HentaiHelper {
    static async makeDoujinEmbed(metadata, channel) {
        let meta_res = metadata
        let json = {}
        json.tag = meta_res.tags.filter(x => x.type == 'tag').map(x => Utils.toPlural(x.name));
        json.category = meta_res.tags.filter(x => x.type == 'category').map(x => Utils.toPlural(x.name));
        json.artist = meta_res.tags.filter(x => x.type == 'artist').map(x => Utils.toPlural(x.name));
        json.parody = meta_res.tags.filter(x => x.type == 'parody').map(x => Utils.toPlural(x.name));
        json.character = meta_res.tags.filter(x => x.type == 'character').map(x => Utils.toPlural(x.name));
        json.cover = `https://t.nhentai.net/galleries/${meta_res.media_id}/cover.${TYPE[meta_res.images.cover.t]}`;
        json.thumb = `https://t.nhentai.net/galleries/${meta_res.media_id}/thumb.${TYPE[meta_res.images.cover.t]}`;
        json.id = meta_res.id

        let info = json;
        let book = new MessageEmbed()
        book.setColor('#65fcbd');
        book.setTitle(`${meta_res.title.pretty}`);
        book.setAuthor('Misaki nHentai Reader');
        book.setColor('#CCCCFF');
        book.setDescription(`Made by: **${info.artist[0] ? info.artist.join(', ') : info.artist}**`);
        book.setURL(`https://nhentai.net/g/${meta_res.id}`);    
        book.setImage(info.cover);
        book.setFooter(`${meta_res.id}`);
        if (info.parody[0]) book.addField('Parody', info.parody[0] ? info.parody.join(`, `) : info.parody, true);
        if (info.character[0]) book.addField('Characters', info.character[0] ? info.character.join(`, `) : info.character, true);
        if (info.category[0]) book.addField('Categories', info.category, true);
        book.addField(`Pages`, meta_res.num_pages, true);
        if (info.tag[0]) book.addField('Tags', info.tag[0] ? info.tag.join(', ') : info.tag);

        await channel.send(book)
        await this.doujinLogger(json, channel)
    }

    static async doujinLogger(metadata, loggingchannel) {
        const channel = loggingchannel.client.guilds.cache.find(x => x.id == 751325116759015546).channels.cache.find(x => x.id == 753577783661428756)
        let tagsLog = metadata.tag
        let idLog = metadata.id

        const loggingEmbed = new MessageEmbed()
        .setTitle('Misaki nHentai Logger')
        .addField('Nuke Code ', idLog)
        .setDescription(tagsLog[0] ? tagsLog.join(', ') : tagsLog)

        await channel.send(loggingEmbed)
    }

    static async getById(sauce) {
        try {
            return await hentai_api.g(sauce)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return 1
        }
    }

    static async getRandom() {
        try {
            return hentai_api.random()
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return 1
        }
    }

    static async getByTags(tags) {
        try {
            let res = await hentai_api.look(tags)
            let num = res.num_pages

            let pagenum = Utils.getRandInt(num)
            res = await hentai_api.look(tags, pagenum)
            res = res.results.filter(x => x.language == 'english').map(x => (x.id))

            let gacha = res[Utils.getRandInt(res.length)]
            return this.getById(gacha)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            return 1
        }
    }
}