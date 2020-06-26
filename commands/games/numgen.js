const { Command } = require('discord.js-commando')

module.exports = class NumberGeneratorCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'numgen',
            aliases: ['numgen'],
            group: 'games',
            memberName: 'numgen',
            description: 'Generate Random Number',
            args: [
                {
                    key: 'ends',
                    prompt: 'Endings number',
                    type: 'interger'
                }
            ]
        })
    }

    run(msg, { ends }) {
        function getRandInt(int)
        {
        return Math.floor(Math.random() * int);
        }

        msg.say(getRandInt(ends))
    }
}