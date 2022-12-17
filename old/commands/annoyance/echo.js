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
        if (msgAuthor != 360824982789685248n) await msg.say('Kyaa?!');
        if (msgAuthor = 360824982789685248n) await msg.say('Fueee~');
        await msg.delete();
        // if (msgAuthor == 360824982789685248n) msg.say('Fueee');
    }
    
}