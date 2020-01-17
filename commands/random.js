const { RichEmbed } = require("discord.js");

exports.run = async (client, msg, args, color) => {
  if (!msg.channel.nsfw) return msg.channel.send(`キャー先輩(≧∇≦)、私まだ未成年んだよ。\nもし先輩があたしと子作りにやるなら、いいよ。\nKyaa~ Senpai, I'm still underage.\nBut if you wanna do it with me, I'm okay.`).then(msg => msg.delete(5000));
    let res = await client.embeds.getRandom();
    await client.embeds.getInfoEmbed(res.id, msg);
}

exports.conf = {
  aliases: ['rand'],
  cooldown: '15'
}

exports.help = {
  name: 'random',
  description: 'Get random nhentai book ID',
  usage: 'random'
}
