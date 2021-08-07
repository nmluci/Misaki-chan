module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        let client = interaction.client
        console.log(interaction.name)

        if ((!interaction.isCommand()) || (!client.commands.has(interaction.commandName))) return

        try {
            await client.commands.get(interaction.commandName).execute(interaction)
        } catch (err) {
            console.log(err)
            await interaction.reply({content: "Error!", ephemeral: true})
        }
    }
}
