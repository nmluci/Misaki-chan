const pkg = require("../package.json");

module.exports = client => {
    const version = pkg.version;

    client.setInterval(() => {
        let status = ['Coding a new Slut', 'Training a Slut', 'Having fun with a girl', 'Attempt to kill Lord Gaben', 'Rentaling a girl', 'Storming the Winter', 'Sleeping as a Fox', 'Gaining a Infame', 'Learning how to become a pervert girls', 'Try masturbating as a girl', 'I\'m a girl', 'Reading Hentai', 'Listening people\'s complain \'bout worlds.', 'Challenging God in Chess Game']; // Add you own rich presence here
        let rand = client.util.getRandInt(status.length);

        client.user.setActivity(status[rand], { type: "" });
    }, 10000);

    console.log(`${client.user.username} is playing with ${client.users.size} slave, in ${client.channels.size} slave rooms of ${client.guilds.size} kingdom...`);

}
