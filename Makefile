BASE_COMPOSE = -f docker-compose.yml
DEV_COMPOSE = ${BASE_COMPOSE} -f docker-compose.dev.yml
TEST_COMPOSE = ${BASE_COMPOSE} -f docker-compose.test.yml
COMPOSE_UP_OPTS = -d

SERVICES = web


default: serve

develop:
	docker-compose $(DEV_COMPOSE) up $(COMPOSE_UP_OPTS)

.PHONY: serve
serve: build
	docker-compose up $(COMPOSE_UP_OPTS)

.PHONY: build
build:
	docker-compose build

build-test:
	docker-compose $(TEST_COMPOSE) build

.PHONY: test
test: build-test
	for service in ${SERVICES} ; do \
		docker-compose $(TEST_COMPOSE) run $$service ; \
	done

.PHONY: stop
stop:
	docker-compose kill -s SIGINT

.PHONY: clean
clean: stop
	docker-compose down --remove-orphans

.PHONY: shell
shell: develop
	docker-compose exec web bash
