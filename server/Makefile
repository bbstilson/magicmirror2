build:
	docker build -t api-server .

stop:
	docker stop api-server

remove:
	docker rmi api-server

prune:
	docker image prune -f

run:
	docker run --rm -p 4000:4000 \
	--name=api-server \
	-e NEWS_API_KEY=31c9319a6ce94907b393408a14f91952 \
	-e WEATHER_API_KEY=ca6a5cfecf5142839769c75e4d72bbe2 \
	api-server

start: remove build run

restart: stop prune build run
