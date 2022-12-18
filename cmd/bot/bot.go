package bot

import (
	"log"

	"github.com/bwmarrin/discordgo"
	"github.com/nmluci/misaki-chan/internal/commands"
	"github.com/nmluci/misaki-chan/internal/components/config"
	"github.com/nmluci/misaki-chan/internal/service"
	"github.com/sirupsen/logrus"
)

type InitBotParams struct {
	Conf    *config.Config
	Logger  *logrus.Entry
	Service *service.Service
}

func InitBot(params InitBotParams) (s *discordgo.Session, err error) {
	s, err = discordgo.New(params.Conf.Misaki.BotToken)
	if err != nil {
		log.Fatalf("failed to init discord bot session err: %+v", err)
	}

	s.Identify.Intents = discordgo.IntentsAll
	s.StateEnabled = true

	slashCmd := commands.NewSlashCommand(&commands.NewSlashCommandParams{
		Logger:  params.Logger,
		Service: params.Service,
	})

	slashCommand, slashHandlers := commands.GenerateCommands(slashCmd, params.Logger)
	s.AddHandler(commands.ReadyHandler(params.Logger))
	s.AddHandler(commands.SlashCommandHandler(slashHandlers))

	err = s.Open()
	if err != nil {
		log.Fatalf("failed to start discord bot session err: %+v", err)
	}

	params.Conf.Misaki.RegisteredCommands = make([]*discordgo.ApplicationCommand, len(slashCommand))
	for i, v := range slashCommand {
		cmd, err := s.ApplicationCommandCreate(s.State.User.ID, "", v)
		if err != nil {
			params.Logger.Fatalf("cannot register command: %v err: %+v", v, err)
		}

		params.Conf.Misaki.RegisteredCommands[i] = cmd
	}

	return
}
