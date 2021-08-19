const {BOT_TOKEN, PREFIX, OWNER} = process.env

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(msg, client) {
        if (!msg.content.startsWith(PREFIX)) return
        else ctx = msg.content.toLowerCase()

        if (ctx.includes("reboot")) {
            const rebootMsg = await msg.reply({content: "Restarting Bot"})
            await client.destroy()
            client.login(BOT_TOKEN)
            await rebootMsg.edit("Rebooted!")
        }

        if (ctx.includes("logout")) {
            await msg.reply({content: "Shutting down..."})
            await client.destroy()
            process.exit()
        }
    }
}
