const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "prs",
    description: "Change my pressence status",
    options: [
        {
            name: "type",
            type: "STRING",
            description: "Pressence's type",
            require: true,
            choices: [
                {
                    name: "play",
                    value: "playing"
                },
                {
                    name: "listen",
                    value: "listening"
                },
                {
                    name: "watch",
                    value: "watching"
                },
                {
                    name: "stream",
                    value: "streaming"
                }
            ]
        },
        {
            name: "status",
            type: "STRING",
            description: "Status",
            require: true
        }
    ],
    async execute(interaction) {
        newType = interaction.options.getString("type")
        newStatus = interaction.options.getString("status")

        msgEmbed = new MessageEmbed()
        .setTitle("Misaki Changelog")
        .setAuthor("Misaki")
        .setDescription(`Presence has changed to <${newType}> ${newStatus}`)

        interaction.client.user.setPresence({
            activities: [{name: newStatus}],
            status: newType
        })
        
        interaction.reply({embeds: [msgEmbed], ephemeral: true})
    }
}