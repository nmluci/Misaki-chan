package logger

import (
	"os"
	"time"

	"github.com/sirupsen/logrus"
)

type NewLoggerParam struct {
	PrettyPrint bool
	ServiceName string
}

type UTCFormatter struct {
	logrus.Formatter
}

func (u UTCFormatter) Format(e *logrus.Entry) ([]byte, error) {
	e.Time = e.Time.UTC()
	return u.Formatter.Format(e)
}

func NewLogger(params NewLoggerParam) *logrus.Entry {
	log := logrus.New()

	log.SetFormatter(&logrus.TextFormatter{
		ForceColors:     true,
		FullTimestamp:   true,
		TimestampFormat: time.RFC3339,
	})
	log.SetOutput(os.Stdout)

	return log.WithFields(nil)
}
