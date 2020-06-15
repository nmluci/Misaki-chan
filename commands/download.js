const { MessageEmbed } = require('discord.js');
const NanaAPI = require('nana-api');
let api = new NanaAPI();

 exports.run = async (client, msg, args, color) => {
   const res = await api.g(args[0]);
   const embed = new MessageEmbed()
   .setAuthor('Misaki-chan Doujin Downloader', client.nHlogo)
   .setColor(color)
   .setURL(`https://dl.nhent.ai/dl/${res.id}`)
   .setTitle(`Download ${res.title.pretty}`)
   .setDescription(`Click the link above to start downloading \`${res.title.pretty}\``)
   msg.channel.send(embed);
 }

 exports.conf = {
   aliases: ['dl'],
   cooldown: '10'
 }

 exports.help = {
   name: 'download',
   description: 'Download nHentai manga',
   usage: 'download <Book_ID>'
 }
