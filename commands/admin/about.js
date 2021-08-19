const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { OWNER } = process.env
const pkg = require("../../package.json")

module.exports = {
    name: "about",
    description: "Server's slave status",
    async execute(interaction) {
        const aboutMisaki = new MessageEmbed()
        .setAuthor('Misaki', null, 'https://github.com/nmluci/Misaki-chan')
        .setTitle('About Me')
        .setDescription(`I'm <@${OWNER}>'s personal digital maid. I can do stuffs, including one you won;t even willing to hear, so be prepared with it`)
        .addField('Original Auth0r', 'Cxizaki', true)
        .setColor('#CCCCFF')
        .setFooter('Kyaa~')

        const aboutAuthor = new MessageEmbed()
        .setAuthor("Misaki", null, "https://github.com/nmluci/Misaki-chan")
        .setTitle("About Master")
        .setDescription("Computer Science Student of Department of Antique Technology of Stellar Multiversity for Earthlings ")
        .addField("Coded in ", "C/C++, Python3, JavaStroke")
        .setColor("#CCCCFF")
        .setFooter("Kyaa~")

        const aboutStatus = new MessageEmbed()
        .setAuthor("Misaki", null, "https://github.com/nmluci/Misaki-chan")
        .setTitle("Misaki ID Card")
        .addField('Mem. Usage', `${Math.floor(process.memoryUsage().heapUsed/1048675)} MB`, true)
        .addField("Bot Version", `${pkg.version}`, true)
        .addField('Node', `${process.version}`, true)
        .addField(`Owner`, `Cxizaki (Fuyuna#1273)`)
        .setColor("#CCCCFF")
        .setFooter("Kyaa~")

        const aboutAuthorBtn = new MessageButton()
        .setLabel("Owner")
        .setCustomId("owner")
        .setStyle("PRIMARY")
        
        const aboutStatsBtn = new MessageButton()
        .setLabel("Status")
        .setCustomId("status")
        .setStyle("PRIMARY")

        const aboutMisakiBtn = new MessageButton()
        .setLabel("Misaki")
        .setCustomId("misaki")
        .setStyle("PRIMARY")

        const aboutBtnRow = new MessageActionRow()
        .addComponents(aboutAuthorBtn, aboutStatsBtn, aboutMisakiBtn)

        let aboutMsg = await interaction.reply({
            ephemeral: false,
            components: [aboutBtnRow],
            embeds: [aboutMisaki]
        })
        
        const ownerFilter = i => i.customId === "owner"
        const misakiFilter = i => i.customId === "misaki"
        const statusFilter = i => i.customId === "status"

        const ownerCollecter = interaction.channel.createMessageComponentCollector({ownerFilter, time: 5000})
        const misakiCollecter = interaction.channel.createMessageComponentCollector({misakiFilter, time: 5000})
        const statusCollecter = interaction.channel.createMessageComponentCollector({statusFilter, time: 5000})

        ownerCollecter.on("collect", async i => {
            if (i.customId === "owner") {
                await interaction.deleteReply()
                await i.reply({embeds: [aboutAuthor], components})
            }})

        misakiCollecter.on("collect", async i => {
            if (i.customId === "misaki") return await interaction.editReply({embeds: [aboutMisaki]})
        })

        statusCollecter.on("collect", async i => {
            if (i.customId === "status") return await interaction.editReply({embeds: [aboutStatus]})
        })
    }
}

