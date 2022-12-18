package service

import (
	"github.com/nmluci/misaki-chan/internal/repository"
	"github.com/sirupsen/logrus"
)

type Service interface {
}

type service struct {
	logger     *logrus.Entry
	conf       *serviceConfig
	repository repository.Repository
	// stellar *
}

type serviceConfig struct{}

type NewServiceParams struct {
	Logger     *logrus.Entry
	Repository repository.Repository
}

func NewService(params *NewServiceParams) Service {
	return &service{
		logger:     params.Logger,
		repository: params.Repository,
		conf:       &serviceConfig{},
	}
}
