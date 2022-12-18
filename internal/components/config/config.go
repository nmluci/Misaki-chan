package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Misaki  *MisakiConfig
	Stellar *StellarConfig
	MariaDB *MariaDBConfig
}

var config Config

func Init() {
	godotenv.Load()

	config.Misaki = &MisakiConfig{
		BotToken:        fmt.Sprintf("Bot %s", os.Getenv("MISAKI_BOT_TOKEN")),
		LegacyCmdPrefix: os.Getenv("MISAKI_PREFIX"),
	}

	config.Stellar = &StellarConfig{
		URL: os.Getenv("STELLAR_URL"),
	}

	config.MariaDB = &MariaDBConfig{
		URL:      os.Getenv("MARIADB_ADDRESS"),
		Username: os.Getenv("MARIADB_USERNAME"),
		Password: os.Getenv("MARIADB_PASSWORD"),
		Database: os.Getenv("MARIADB_DATABASE"),
	}
}

func GetConfig() *Config {
	return &config
}
