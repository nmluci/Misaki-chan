package main

import (
	"context"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

var log = &logrus.Logger{
	Out:       os.Stderr,
	Formatter: new(logrus.TextFormatter),
	Hooks:     make(logrus.LevelHooks),
	Level:     logrus.InfoLevel,
}

var noCtx = context.Background()

func messageParser(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}

	if !strings.HasPrefix(m.Content, "!") {
		return
	}

	m.Content = strings.TrimPrefix(m.Content, "!")

	switch m.Content {
	case "ping":
		msg, err := s.ChannelMessageSend(m.ChannelID, "Kyaa!")
		if err != nil {
			log.Errorf("failed to send message: %+v err: %+v", msg, err)
		}
	}
}

func readyHandler(s *discordgo.Session, m *discordgo.Ready) {
	if err := s.UpdateGameStatus(0, "slavery"); err != nil {
		log.Fatalf("failed to update status err: %+v", err)
	}
}

func main() {
	godotenv.Load()

	session, err := discordgo.New("Bot " + os.Getenv("DISCORD_TOKEN"))
	if err != nil {
		log.Fatalf("failed to init session: %+v", err)
	}

	session.Identify.Intents = discordgo.IntentsAll
	session.StateEnabled = true
	session.AddHandler(readyHandler)
	session.AddHandler(messageParser)
	if err := session.Open(); err != nil {
		log.Fatalf("failed to start WS Session: %+v", err)
	}

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc
}
