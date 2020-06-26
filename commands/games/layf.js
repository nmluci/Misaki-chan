const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')

module.exports = class LayfGameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'layf',
            aliases: ['layf', 'gol'],
            memberName: 'layf',
            description: 'Game of Layf with a Twist',
            clientPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES', 'EMBED_LINKS']
        })
    }
    
    async run(msg) {
        function getRandInt(int)
        {
        return Math.floor(Math.random() * int);
        }

        const bedlak = [
        'You fell from your seat while sleeping in the class [awkward]',
        'You met your crush in the pathway to school [deredere]',
        'Your crush sees you doing miserable things [awkward]',
        'You found out that your crush already dating [superb-awkward]',
        'You got dating with your crush [superb-deredere]',
        'You reached the top 100 scoreboard on your last exam [genius]',
        'You reached the top -100 scoreboard on your last exam [idiot]',
        'You got a recommendation [superb-genius]',
        'You got expelled from school [super-idiot]'
        ]
        msg.say(`This Feature Still Ongoing Project`)
        return msg.say(bedlak[getRandInt(bedlak.length)])
    }
}