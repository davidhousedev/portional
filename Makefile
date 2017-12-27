BASE_COMPOSE = docker-compose.yml
DEV_COMPOSE = docker-compose.dev.yml
COMPOSE_UP_OPTS = -d --build


default: serve

develop:
	docker-compose \
		-f $(BASE_COMPOSE) \
		-f $(DEV_COMPOSE) \
		up $(COMPOSE_UP_OPTS)

.PHONY: serve
serve:
	docker-compose up $(COMPOSE_UP_OPTS)

.PHONY: build
build:
	docker-compose build

.PHONY: stop
stop:
	docker-compose kill -s SIGINT

.PHONY: clean
clean: stop
	docker-compose down --remove-orphans

.PHONY: shell
shell: develop
	docker-compose exec web bash
