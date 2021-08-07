module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log("It's Inside =c=")
        console.log(`Currently establishing a sub-slavery as ${client.user.username}! <${client.user.id}>`)
        client.user.setPresence({
            activities: [{name: "Visual Studio Code"}], 
            status: 'playing'
        })
        client.guilds.cache.get("751325116759015546").commands.set(client.commands)
    }
}