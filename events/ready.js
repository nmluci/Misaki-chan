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
        let masterGuild = client.guilds.cache.find(x => x.id == 370927823948611584).channels.cache.find(x => x.id == 725394117688950815)
        masterGuild.send(`${client.ero.logon}`)
    }
}