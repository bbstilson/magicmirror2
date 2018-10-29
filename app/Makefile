build:
	docker build -t web-app .

stop:
	docker stop web-app

prune:
	docker image prune -f

run:
	docker run --rm -p 3000:3000 \
	--name=web-app \
	web-app

start: build run

restart: stop prune build run
