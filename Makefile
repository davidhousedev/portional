BASE_COMPOSE = -f docker-compose.yml
DEV_COMPOSE = ${BASE_COMPOSE} -f docker-compose.dev.yml
TEST_COMPOSE = ${BASE_COMPOSE} -f docker-compose.test.yml
COMPOSE_UP_OPTS = -d

SERVICES = web

RECIPE_PORT = 8000
RECIPE_URL_BASE = http://localhost:${RECIPE_PORT}


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
		docker-compose $(TEST_COMPOSE) run $$service bash run_tests.sh ; \
	done

.PHONY: stop
stop:
	docker-compose kill -s SIGINT

.PHONY: clean
clean: stop
	docker-compose down --remove-orphans

.PHONY: shell
shell: develop
	docker-compose $(DEV_COMPOSE) exec web \
		bash

.PHONY: migrate
migrate: develop
	docker-compose $(DEV_COMPOSE) exec web \
		python manage.py makemigrations
	docker-compose $(DEV_COMPOSE) exec web \
		python manage.py migrate

.PHONY: nuke-db
nuke-db: clean
	docker volume rm portional_postgres-data

.PHONY: nuke
nuke: nuke-db

.PHONY: superuser
superuser: develop
	@echo "\nCreating the superuser: root. Please sepcify a password..."
	docker-compose $(DEV_COMPOSE) exec web \
 		python manage.py createsuperuser \
 			--username root \
 			--email davidhousedev@gmail.com

.PHONY: welcome
welcome:
	@echo "||===========================================||"
	@echo "||  You are now ready to work on Portional!  ||"
	@echo "||===========================================||"
	@echo "API Server: 		${RECIPE_URL_BASE}/recipe/api/v1/"
	@echo "API Login: 		${RECIPE_URL_BASE}/api-auth/"
	@echo "Django Admin: 	${RECIPE_URL_BASE}/admin/"

.PHONY re-init:
re-init: nuke init

.PHONY: init
init: migrate superuser welcome
