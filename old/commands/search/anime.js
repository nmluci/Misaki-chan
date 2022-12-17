const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags')

const searchGraphQL = stripIndents`
	query ($search: String, $type: MediaType, $isAdult: Boolean) {
		anime: Page (perPage: 10) {
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
			season
			type
			siteUrl
			status
			episodes
			isAdult
			meanScore
			averageScore
			externalLinks {
				url
				site
            }
            genres
		}
	}
`;

module.exports = class AnimeSearchCommand extends Command{
    constructor(client) {
        super(client, {
            name: 'anime',
            aliases: ['ani', 'anime'],
            group: 'search',
            memberName: 'anime',
            description: 'Search anime',
            args: [
                {
                    key: 'anime',
                    prompt: 'anime name',
                    type: 'string'
                }
            ],
            clientPermissions: ['MANAGE_MESSAGES']
        })
    }

    async run(msg, { anime }) {
        try {
            const id = await this.search(anime);
            const animeData = await this.fetchAnime(id);
            const animeEmbed = new MessageEmbed()
            .setTitle(animeData.title.romaji)
            .setAuthor('Misaki x AniList')
            .setColor(0xfc3fb4)
            .setThumbnail(animeData.coverImage.large || animeData.coverImage.medium || null )
            .setURL(animeData.siteUrl)
            .addField('Title', animeData.title.romaji, true)
            .setDescription(animeData.description.replace('<br>', ' '))
            .addField('Season', animeData.season, true)
            .addField('Status', animeData.status, true)
            .addField('Episodes', animeData.episodes, true)
            .addField('Avg. Score', animeData.averageScore)
            .addField('Genres', animeData.genres)
            msg.say(animeEmbed)
        } catch (err) {
            msg.say('Not Found!')
            console.log(`[ERROR] ${err}`)
        }
    }

    async search(query) {
        const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                search: query,
                type: 'ANIME'
            },
            query: searchGraphQL
        });
        console.log(body.data)
        return body.data.anime.results[0].id
    }

    async fetchAnime(id) {
        const { body } = await request
        .post('https://graphql.anilist.co/')
        .send({
            variables: {
                id: id,
                type: 'ANIME'
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