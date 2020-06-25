const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags')

const searchGraphQL = stripIndents`
	query ($search: String, $type: MediaType, $isAdult: Boolean) {
		manga: Page (perPage: 10) {
			results: media (type: $type, isAdult: $isAdult, search: $search) {
				id
				title {
					english
					romaji
				}
			}
		}
	}
`;
const resultGraphQL = stripIndents`
	query media($id: Int, $type: MediaType) {
		Media(id: $id, type: $type) {
			id
			title {
				english
				romaji
			}
			coverImage {
				large
				medium
			}
			startDate { year }
			description(asHtml: false)
			type
			siteUrl
			status
			isAdult
			meanScore
			averageScore
			externalLinks {
				url
				site
            }
            genres
            chapters
		}
	}
`;

module.exports = class MangaSearchCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'manga',
            aliases: ['manga'],
            group: 'search',
            memberName: 'manga',
            description: 'Search manga',
            args: [
                {
                    key: 'manga',
                    prompt: 'manga name',
                    type: 'string'
                }
            ],
            clientPermissions: ['MANAGE_MESSAGES']
        })
    }

    async run(msg, { manga }) {
        const id = await this.search(manga);
        const mangaData = await this.fetchManga(id);

        const mangaEmbed = new MessageEmbed()
        .setTitle(mangaData.title.romaji)
        .setAuthor('Misaki x AniList')
        .setColor(0xfc3fb4)
        .setThumbnail(mangaData.coverImage.large || mangaData.coverImage.medium || null )
        .setURL(mangaData.siteUrl)
        .addField('Title', mangaData.title.romaji, true)
        .setDescription(mangaData.description.replace('<br>', ' '))
        .addField('Status', mangaData.status, true)
        .addField('Chapters', mangaData.chapters, true)
        .addField('Avg. Score', mangaData.averageScore)
        .addField('Genres', mangaData.genres)
        msg.say(mangaEmbed)

    }

    async search(query) {
        const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                search: query,
                type: 'MANGA'
            },
            query: searchGraphQL
        });
        console.log(body.data)
        return body.data.manga.results[0].id
    }

    async fetchManga(id) {
        const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                id: id,
                type: 'MANGA'
            },
            query: resultGraphQL
        });
        console.log(body);
        return body.data.Media;
    }
    
    onBlock(msg, reason) {
        if (reason == 'clientPermissions') {
            msg.say('Urghh, もう我慢できない！')
        }
    }
}