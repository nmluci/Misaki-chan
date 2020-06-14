const { RichEmbed } = require("discord.js");
const NanaAPI = require('nana-api');
let api = new NanaAPI();

exports.run = async (client, msg, args, color) => {
  let nick = msg.member.nickname !== null ? `${msg.member.nickname}` : msg.author.username;
  let input = args[0];
  console.log(input);
    
  let result = await api.search(input);
  console.log(result.results[1]);
  msg.channel.send(viewer);
  msg.channel.send('LOL')
}

exports.conf = {
  aliases: ['br'],
  cooldown: '15'
}

exports.help = {
  name: 'browse',
  description: 'Read nHentai manga from Discord',
  usage: 'browse <tags>'
}
