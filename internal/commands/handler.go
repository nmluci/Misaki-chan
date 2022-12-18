package commands

import (
	"github.com/bwmarrin/discordgo"
	"github.com/sirupsen/logrus"
)

// the dev are too stupid to implement support of generics
// type HandlerFunc[T any] func(s *discordgo.Session, i T)

func SlashCommandHandler(cmds map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate)) func(s *discordgo.Session, i *discordgo.InteractionCreate) {
	return func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		if handler, ok := cmds[i.ApplicationCommandData().Name]; ok {
			handler(s, i)
		}
	}
}

func ReadyHandler(logger *logrus.Entry) func(s *discordgo.Session, i *discordgo.Ready) {
	return func(s *discordgo.Session, i *discordgo.Ready) {
		err := s.UpdateGameStatus(0, "beta-testing new slavery")
		if err != nil {
			logger.Errorf("failed to set status name err: %+v", err)
		} else {
			logger.Infof("established neo-slavery as %s#%v", s.State.User.Username, s.State.User.Discriminator)
		}
	}
}
