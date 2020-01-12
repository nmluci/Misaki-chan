const Discord = require("discord.js");
const nHentaiAPI = require('nhentai-api-js');
let api = new nHentaiAPI();

exports.run = async (client, msg, args, color) => {
    if (!msg.channel.nsfw) return msg.channel.send(`キャー先輩(≧∇≦)、私まだ未成年んだよ。\nもし先輩があたしと子作りにやるなら、いいよ。\nKyaa~ Senpai, I'm still underage.\nBut if you wanna do it with me, I'm okay.`).then(msg => msg.delete(5000));

    let lang = args[0];
    if (lang == "ch") {
        lang = "chinese"
    } else if (lang == 'en') {
        lang = 'english'
    } else if (lang == 'jp') {
        lang = 'japanese'
    }
    if (!client.config.LANG.includes(lang)) return msg.channel.send('Available langauge is \`English\`, \`Japanese\` & \`Chinese\`').then(msg => msg.delete(5000));

    let numPages = await api.search(lang);
    let id = await api.search(lang, client.util.getRandInt(numPages.num_pages));
    const res = await api.g(id.results[client.util.getRandInt(id.results.length)].id);
    await client.embeds.getInfoEmbed(res.id, msg);
};

exports.conf = {
  aliases: ['lang']
}

exports.help = {
  name: "language",
  description: 'Search random nHentai manga from language. You can use alias language\nExample: en, ch, or jp.',
  usage: 'language'
}
