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

    async run(msg) {
        msg.delete()
        const msgAuthor = msgAuthor;
        msg.delete();
        if (msgAuthor != 360824982789685248n) msg.say('Kyaa?!');
        if (msgAuthor = 360824982789685248n) msg.say('Fueee~');
        // if (msgAuthor == 360824982789685248n) msg.say('Fueee');
    }
    
}