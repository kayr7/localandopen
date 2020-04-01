export GOPATH = $(PWD)

all: 
	CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main src/main.go
	docker build -t localandopenapi -f Dockerfile .
	docker save -o localandopenapi.tar localandopenapi
	docker run -d --name localandopenapi -p 8000:8000 localandopenapi
