module.exports = async (client, msg) => {
    console.log(`It's inside~`)
    console.log(`Currently establishing a sub-slavery as ${client.user.username}! (${client.user.id})`)
    client.user.setPresence({
        activity: {
            name: `Vibing`,
            type: 'LISTENING'
        },
        status: 'idle'
    })
    
    if (!process.env.DEBUG) {
        let masterGuild = client.guilds.cache.find(x => x.id == 751325116759015546).channels.cache.find(x => x.id == 757930629529862184)
        masterGuild.send(`${client.ero.logon}`)
    }
}