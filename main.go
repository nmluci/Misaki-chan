package main

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/nmluci/misaki-chan/cmd/bot"
	"github.com/nmluci/misaki-chan/internal/components/config"
	"github.com/nmluci/misaki-chan/internal/components/database"
	"github.com/nmluci/misaki-chan/internal/components/logger"
	"github.com/nmluci/misaki-chan/internal/repository"
	"github.com/nmluci/misaki-chan/internal/service"
)

func main() {
	config.Init()
	conf := config.GetConfig()

	logger := logger.NewLogger(logger.NewLoggerParam{
		PrettyPrint: true,
	})

	db, err := database.InitMariaDB(&database.InitMariaDBParams{
		Conf:   conf.MariaDB,
		Logger: logger,
	})
	if err != nil {
		logger.Fatalf("failed to initialize mariaDB err: %+v", err)
	}

	repo := repository.NewRepository(&repository.NewRepositoryParams{
		Logger:  logger,
		MariaDB: db,
	})

	service := service.NewService(&service.NewServiceParams{
		Logger:     logger,
		Repository: repo,
	})

	session, err := bot.InitBot(bot.InitBotParams{
		Conf:    conf,
		Logger:  logger,
		Service: &service,
	})
	if err != nil {
		logger.Fatalf("failed to initialize bot session err: %+v", err)
	}

	defer session.Close()

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc

	for _, v := range conf.Misaki.RegisteredCommands {
		err = session.ApplicationCommandDelete(session.State.User.ID, "", v.ID)
		if err != nil {
			logger.Errorf("failed to delete command: %+v err: %+v", v, err)
		}
	}

	logger.Infoln("bye goshuujin-sama!")
}
