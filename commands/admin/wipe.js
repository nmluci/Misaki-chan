const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "delete-bulk",
    description: "delete message(s)",
    options: [
        {
            name: "sum",
            description: "sum of message(s) to be deleted",
            type: "INTEGER",
            require: true
        }
    ],
    async execute(interaction) {
        sum = interaction.options.getInteger("sum")
        
        const confirmMsg = new MessageEmbed()
        .setAuthor("Misaki")
        .setTitle("Nuke Confirmation")
        .setDescription("Are you sure wanna nuke this channel?")
        .setFooter("=,=")
        .setColor("YELLOW")

        
        const confirmBtn = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Yes")
            .setCustomId("y")
            .setStyle("SUCCESS")
        )
        .addComponents(
                new MessageButton()
                .setLabel("NO")
                .setCustomId("n")
                .setStyle("DANGER")
        )
                
        const cancelMsg = new MessageEmbed()
        .setAuthor("Misaki")
        .setTitle("Nuke Reports")
        .setDescription("OPERATION CANCELED!")
        .setFooter("=v=")
        .setColor("#CCCCFF")

        const msgEmbeds = new MessageEmbed()
        .setAuthor("Misaki")
        .setTitle("Nuke Reports")
        .addField("Messages Deleted", String(sum), true)
        .setFooter("Kyaa~")
        .setColor("BLURPLE") 
        
        await interaction.reply({embeds: [confirmMsg], components: [confirmBtn], ephemeral: true})

        interaction.client.on("interactionCreate", async btnInteract => {
            if (!btnInteract.isButton()) return
            
            if (btnInteract.customId === "y") {
                await interaction.channel.bulkDelete(sum)
                await interaction.editReply({embeds: [confirmMsg.setDescription("NUKED!").setColor("DARK_VIVID_PINK")], 
                    components: [], ephemeral: false})
                await interaction.followUp({embeds: [msgEmbeds], components: [], ephemeral: false})
            } else {
                await interaction.editReply({embeds: [cancelMsg], components: [], ephemeral: true})
            }
        })
    }
}