build:
	docker build -t api-server .	

stop:
	docker stop api-server

prune:
	docker image prune -f

run:
	docker run --rm -p 4000:4000 \
	--name=api-server \
	-e NEWS_API_KEY=7604c1d725c34cecab73476858d4b74c \
	-e WEATHER_API_KEY=89032186851c0ae0b2c94f9f4d605deb \
	api-server

start: build run

restart: stop prune build run
