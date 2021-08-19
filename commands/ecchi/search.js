// const {Hentai} = require("../../libs/nhentai") // Reserved for Future Libs
const nhentai = require("nhentai")

module.exports = {
    name: "search_doujin",
    description: "Search for **doujin** by title",
    options: [
        {
            name: "title",
            type: "STRING",
            description: "title to search",
            require: true
        }
    ],
    async execute(interaction) {
        let searchQuery = interaction.options.getString("title")
        const api = new nhentai.API()
        let res = await api.search(searchQuery)
        console.log(res.doujins[0])
        console.log(res.doujins.map(doujin => doujin.titles.pretty))
        await interaction.reply("None")
    }
}