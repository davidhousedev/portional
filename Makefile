BASE_COMPOSE = docker-compose.yml
DEV_COMPOSE = docker-compose.dev.yml
COMPOSE_UP_OPTS = -d --build

default: serve

develop:
	docker-compose \
		-f $(BASE_COMPOSE) \
		-f $(DEV_COMPOSE) \
		up $(COMPOSE_UP_OPTS)

serve:
	docker-compose up $(COMPOSE_UP_OPTS)

build:
	docker-compose build

stop:
	docker-compose kill -s SIGINT

clean: stop
	docker-compose down --remove-orphans
