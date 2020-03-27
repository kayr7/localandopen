export GOPATH = $(PWD)

all: 
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main src/main.go
	docker build -t localandopenapi -f Dockerfile .