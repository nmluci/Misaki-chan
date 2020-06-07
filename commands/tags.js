const nHentaiAPI = require('nhentai-api-js');
let api = new nHentaiAPI();

exports.run = async (client, msg, args, color) => {
    if (!msg.channel.nsfw) return msg.channel.send(`キャー先輩(≧∇≦)、私まだ未成年んだよ。\nもし先輩があたしと子作りにやるなら、いいよ。\nKyaa~ Senpai, I'm still underage.\nBut if you wanna do it with me, I'm okay.`).then(msg => msg.delete(5000));
    let input = args[0];
    let lang = args[1];
    if (!lang) lang = 'english';
    if (!client.config.LANG.includes(lang)) return msg.channel.send('Available langauge is \`English\`, \`Japanese\` & \`Chinese\`').then(msg => msg.delete(5000));
    if (lang == "ch") {
        lang = "chinese"
    } else if (lang == 'en') {
        lang = 'english'
    } else if (lang == 'jp') {
        lang = 'japanese'
    }
    if (input == 'brainfuck') {
      const input = 'yuri'
      msg.channel.send('Kya~ Hageshi sugiruu~').then(msg => msg.delete(2000));
      console.log(input);
      let numPages = await api.search(input);
      let id = await api.search(input, client.util.getRandInt(numPages.num_pages));
      const res = await api.g(id.results.find(x => x.language == lang).id);
      await client.embeds.getInfoEmbed(res.id, msg);
      msg.channel.send('Fufufu').then(msg => msg.delete(5000));

    } else if (input == 'luci') {
      const input = 'yuri';
      msg.channel.send('きゃあ、マスターが来た\nあたし準備出来たんだよ。');
      console.log(`${input}, マスターの特別あつけ`);
      let numPages = await api.search(input);
      let id = await api.search(input, client.util.getRandInt(numPages.num_pages));
      const res = await api.g(id.results.find(x => x.language == lang).id);
      await client.embeds.getInfoEmbed(res.id, msg);
    } else {
      console.log(input);
      let numPages = await api.search(input);
      let id = await api.search(input, client.util.getRandInt(numPages.num_pages));
      const res = await api.g(id.results.find(x => x.language == lang).id);
      await client.embeds.getInfoEmbed(res.id, msg);
    }
}

exports.conf = {
  aliases: ['t']
}

exports.help = {
  name: "tags",
  description: "Get random doujin with provide name and language",
  usage: 'tags <tags> <language>'
}
