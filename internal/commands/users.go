package commands

import (
	"time"

	"github.com/bwmarrin/discordgo"
	"github.com/nmluci/misaki-chan/internal/commontypes"
)

var memberPerm int64 = discordgo.PermissionSendMessages

func (cmd *slashCommand) GetUser() (metadata *discordgo.ApplicationCommand, handler func(s *discordgo.Session, i *discordgo.InteractionCreate)) {
	metadata = &discordgo.ApplicationCommand{
		Name:                     "get-user",
		Description:              "get current's user metadata",
		DefaultMemberPermissions: &memberPerm,
		DMPermission:             &commontypes.BOOL_TRUE,
	}

	handler = func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		if err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Flags: discordgo.MessageFlagsEphemeral,
			},
		}); err != nil {
			cmd.logger.Errorf("deferred resp err: %+v", err)
		}

		if _, err := s.InteractionResponseEdit(i.Interaction, &discordgo.WebhookEdit{
			Embeds: &[]*discordgo.MessageEmbed{
				&discordgo.MessageEmbed{
					Type:        "rich",
					Title:       "Natsme-chan Beta V4",
					Description: "Natsume-chan rewrite beta bot client",
					Timestamp:   time.Now().UTC().Format("2006-01-02T15:04:05.999Z"),
					Color:       16777206,
					Author: &discordgo.MessageEmbedAuthor{
						Name: "Natsume-chan x Stellar MS",
					},
					Fields: []*discordgo.MessageEmbedField{
						&discordgo.MessageEmbedField{Name: "Username", Value: i.User.Username, Inline: true},
					},
				},
			},
		}); err != nil {
			cmd.logger.Errorf("reply err: %+v", err)
		}
	}

	return
}
