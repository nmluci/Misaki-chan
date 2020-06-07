const nHentaiAPI = require('nhentai-api-js');
let api = new nHentaiAPI();

exports.run = async (client, msg, args, color) => {
    if (!msg.channel.nsfw) return msg.channel.send(`キャー先輩(≧∇≦)、私まだ未成年んだよ。\nもし先輩があたしと子作りにやるなら、いいよ。\nKyaa~ Senpai, I'm still underage.\nBut if you wanna do it with me, I'm okay.`).then(msg => msg.delete(5000));
    args = (args[0] ? args.join(' ') : args[0]);
    // console.log(args.length);
    num = args.slice(args.length-2, args.length);
    tags = args.slice(0, args.length-2);
    let input = tags;
    // console.log(input);
    let lang = 'english'
    // console.log(lang);
    let sum = num;
    console.log(sum);
    if (!lang) lang = 'english';
    if (!client.config.LANG.includes(lang)) return msg.channel.send('Available langauge is \`English\`, \`Japanese\` & \`Chinese\`').then(msg => msg.delete(5000));
    if (lang == "ch") {
        lang = "chinese"
    } else if (lang == 'en') {
        lang = 'english'
    } else if (lang == 'jp') {
        lang = 'japanese'
    }
    if (input.includes('brainfuck')) {
      const input = `yaoi`;
      msg.channel.send('Kya~ Hageshi sugiruu~').then(msg => msg.delete(2000));
      // console.log(input);
      msg.channel.send(`Degenerating <@${msg.author.id}> with ${sum} doujin...`).then(msg => msg.delete(3000));
      msg.author.send(`I SEE WUT R U DOIN IN THERE FUFUFU`).then(msg => msg.delete(5000));
      msg.author.send(`I see you like ${input}...`);
      let numPages = await api.search(input);
      let id = await api.search(input, client.util.getRandInt(numPages.num_pages));
      const res = await api.g(id.results.find(x => x.language == lang).id);
      await client.embeds.getInfoEmbed(res.id, msg);
      // console.log(res.id);
      // console.log(res.tags);
      msg.channel.send('Fufufu').then(msg => msg.delete(5000));

    } else {
      console.log(input);
      msg.author.send(`I see you like ${input}...`);
      msg.channel.send(`Degenerating <@${msg.author.id}> with ${sum} doujin...`).then(msg => msg.delete(3000));
      for (i = 0; i < sum; i++) {
        let numPages = await api.search(input);
        let id = await api.search(input, client.util.getRandInt(numPages.num_pages));
        const res = await api.g(id.results.find(x => x.language == lang).id);
        await client.embeds.getInfoEmbed(res.id, msg);
        // console.log(res.id);
        // console.log(res);
      }
    }
}

exports.conf = {
  aliases: ['gc']
}

exports.help = {
  name: "gacha",
  description: "Give a chance to degenerated yourself for a while",
  usage: 'gacha <tags> <number>'
}
