const {OWNER} = process.env

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        let client = interaction.client
        console.log(interaction.name)

        if ((!interaction.isCommand()) || (!client.commands.has(interaction.commandName))) return

        try {
            if (client.commands.get(interaction.commandName).admin && interaction.user.id != OWNER) {
                return interaction.reply({content:"You don't have sufficient permission", ephemeral:true})
            } 
            return await client.commands.get(interaction.commandName).execute(interaction)
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            await interaction.reply({content: "Error!", ephemeral: true})
        }
    }
}
