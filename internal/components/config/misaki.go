package config

import "github.com/bwmarrin/discordgo"

type MisakiConfig struct {
	BotToken           string
	LegacyCmdPrefix    string
	RegisteredCommands []*discordgo.ApplicationCommand
}
