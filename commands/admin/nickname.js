const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "nickname",
    description: "(misaki-internal) change's nickname",
    admin: true,
    options: [
        {
            name: "name",
            description: "Fueeee",
            type: "STRING",
            require: true
        }
    ],
    async execute(interaction) {
        newName = interaction.options.getString("name")
        oldName = interaction.client.user.username

        msgEmbed = new MessageEmbed()
        .setAuthor(newName)
        .setTitle(`${newName} Changelog`)
        .setDescription(`Name has changes!`)
        .addField("Old Name", oldName)
        .addField("New Name", newName)
        .setColor("#CCCCFF")
        .setFooter("=c=")

        await interaction.deferReply()
        await interaction.client.user.setUsername(newName)
        await interaction.followUp({embeds: [msgEmbed]})
        console.log(`New Name >> ${newName}`)
    }
}