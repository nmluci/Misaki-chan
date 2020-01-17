const { Client } = require('discord.js');
const FynEmbeds = require('./FynEmbeds.js');

class Fyn extends Client {

  constructor(opt){
    super(opt);

    this.config = require('../config');
    this.util = require('./FynUtils');
    this.embeds = new FynEmbeds(this);
    this.nHlogo = 'https://cdn.discordapp.com/attachments/466964106692395008/icon_nhentai.png';
  }
}

module.exports = Fyn;
