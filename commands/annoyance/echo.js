const {Command} = require ('discord.js-commando');

module.exports = class EchoCommands extends Command {
    constructor (client) {
        super(client, {
            name: 'echo',
            aliases: ['echo'],
            group: 'annoyance',
            memberName: 'echo',
            description: 'ehehehe',
            // patterns: [/fue+|kimoi+|yamete+|^kya+/i]
       })
    }

    run(msg) {
        if (msg.author != 360824982789685248n) msg.say('Kyaa?!');
        if (msg.author != 360824982789685248n) msg.say('Fueee~');
        // if (msg.author == 360824982789685248n) msg.say('Fueee');
    }
    
}