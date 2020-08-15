const { CommandoClient } = require('discord.js-commando')
const { readdirsync } = require('fs')
const { Collection } = require('discord.js')
const path = require('path')
const { ero, tsundere, slave, deredere } = require('../libs/Personality')
const { settings } = require('./settings')

module.exports = class MisakiClient extends CommandoClient {
    constructor(options) {
        super(options)
        this.debug = false
        this.lastchannel = new Collection()
    }
    
    ero = ero
    tsundere = tsundere
    slave = slave
    deredere = deredere
    settings = settings
}