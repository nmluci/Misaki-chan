const { Client } = require('discord.js');
const FynEmbeds = require('./FynEmbeds.js');

class Fyn extends Client {

  constructor(opt){
    super(opt);

    this.config = require('../config');
    this.util = require('./FynUtils');
    this.embeds = new FynEmbeds(this);
    this.nHlogo = "https://i.imgur.com/OFC149y.png";
  }
}

module.exports = Fyn;
