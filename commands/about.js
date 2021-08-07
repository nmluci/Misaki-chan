const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "about",
    description: "Server's slave status",
    async execute(interaction) {
        const embded = new MessageEmbed()
        .setAuthor("Misaki", null, 'https://github.com/nmluci/Misaki-chan')
        .setTitle("About Me")
        .setDescription(`I'm Fuyuna's Personal Maid}`)
        .setColor('#CCCCFF')
        .setFooter("Kyaa~")

        const btn = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("はい")
            .setCustomId("hai")
            .setStyle("PRIMARY")
        )

        let aboutMsg = await interaction.reply({
            ephemeral: true,
            components: [btn],
            embeds: [embded]
        })
        
        interaction.client.on("interactionCreate", btnInteract => {
            if (!btnInteract.isButton()) return
            interaction.editReply({content: "NU!", ephemeral: false, components: []})
        })
    }
}

