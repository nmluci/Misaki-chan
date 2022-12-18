package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
)

type Repository interface {
}

type repository struct {
	mariaDB *sqlx.DB
	logger  *logrus.Entry
	conf    *repositoryConfig
}

type repositoryConfig struct{}

type NewRepositoryParams struct {
	Logger  *logrus.Entry
	MariaDB *sqlx.DB
}

func NewRepository(params *NewRepositoryParams) Repository {
	return &repository{
		logger:  params.Logger,
		conf:    &repositoryConfig{},
		mariaDB: params.MariaDB,
	}
}
