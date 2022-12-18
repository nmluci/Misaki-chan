package commands

import (
	"reflect"

	"github.com/bwmarrin/discordgo"
	"github.com/nmluci/misaki-chan/internal/service"
	"github.com/sirupsen/logrus"
)

type SlashCommand interface {
	GetUser() (metadata *discordgo.ApplicationCommand, handlers func(s *discordgo.Session, i *discordgo.InteractionCreate))
}

type slashCommand struct {
	logger  *logrus.Entry
	service *service.Service
	conf    *slashCommandConfig
}

type NewSlashCommandParams struct {
	Logger  *logrus.Entry
	Service *service.Service
}

type slashCommandConfig struct{}

func NewSlashCommand(params *NewSlashCommandParams) SlashCommand {
	return &slashCommand{
		logger:  params.Logger,
		service: params.Service,
		conf:    &slashCommandConfig{},
	}
}

func GenerateCommands(scmd SlashCommand, logger *logrus.Entry) (commands []*discordgo.ApplicationCommand, handlers map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate)) {
	slashCommandType := reflect.ValueOf(scmd)
	lenSlashCommand := slashCommandType.NumMethod()

	commands = make([]*discordgo.ApplicationCommand, lenSlashCommand)
	handlers = make(map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate), lenSlashCommand)

	for i := 0; i < lenSlashCommand; i++ {
		method := slashCommandType.Method(i)

		val := method.Call([]reflect.Value{})
		metadata := val[0].Interface().(*discordgo.ApplicationCommand)
		handler := val[1].Interface().(func(s *discordgo.Session, i *discordgo.InteractionCreate))

		if _, ok := handlers[metadata.Name]; !ok {
			commands[i] = metadata
			handlers[metadata.Name] = handler
		} else {
			logger.Errorf("failed to generate command: %v err: already existed", metadata.Name)
		}
	}

	return
}
