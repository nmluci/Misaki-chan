const {Command} = require ('discord.js-commando');
const { getRandInt } = require('../../libs/Utils');


module.exports = class BotStatus extends Command{
    constructor(client) {
        super(client, {
            name: 'unknown',
            group: 'admin',
            memberName: 'unknown',
            description: 'Well... this is kinda... ummm...',
            unknown: true
        })
    }
    
    run(msg) {
        let randtext = [
            `Pfft, Can't figure out what is the exact keywords? Try ${this.client.commandPrefix} help!`,
            `${msg.author}, try ${this.client.commandPrefix} help!`,
            `Wat r u saying? try ${this.client.commandPrefix} help if you know nothing!`
        ]
       return msg.say(randtext[getRandInt(randtext.length)])
    }
}