#
# Copyright 2021-present, Nuance, Inc.
# All rights reserved.
#
# This source code is licensed under the Apache-2.0 license found in
# the LICENSE.md file in the root directory of this source tree.
#

PLATFORM 			:= $(shell uname -s)
XMKCERT				:=
XOPENSSL			:=
XOPEN				:=
XPACKAGEMANAGER		:=
XVENVACTIVATE		:=

ifeq ($(OS),Windows_NT)
	XPACKAGEMANAGER=choco
	XMKCERT=mkcert.exe
	XOPENSSL=openssl.exe
	XOPEN=start
	XVENVACTIVATE=.venv/scripts/activate
else
	ifeq ($(PLATFORM),Linux)
		XPACKAGEMANAGER=brew
		XMKCERT=mkcert
		XOPENSSL=openssl
		XOPEN=xdg-open
		XVENVACTIVATE=.venv/bin/activate
	endif
	ifeq ($(PLATFORM),Darwin)
		XPACKAGEMANAGER=brew
		XMKCERT=mkcert
		XOPENSSL=openssl
		XOPEN=open
		XVENVACTIVATE=.venv/bin/activate
	endif
endif

all : certs-prep native-build-app native-build-api \
		native-run-app-secure native-run-api-secure native-clean \
		containers-build containers-run containers-restart \
		containers-stop containers-status containers-logs \
		containers-clean launch new-data-access-endpoint help
.PHONY : all

help:
	@echo "See the README for more details."
	@echo "CERTS:  certs-(prep|setup)"
	@echo "*LAUNCH:  launch"
	@echo "DOCKER:  containers-(build|run|restart|stop|status|logs|clean)"
	@echo "NATIVE.BUILD:  native-build-(app|api)"
	@echo "NATIVE.RUN:  native-run-(app|api)-(secure|insecure)"
	@echo "NATIVE.CLEANUP:  native-clean"
	@echo "DATA.ACCESS:  new-data-access-endpoint"

# SSL
certs-prep:
	@echo Preparing requirements for certificates.
	$(XPACKAGEMANAGER) install openssl mkcert

certs-setup:
	@echo Creating and Installing Certs for SSL
	cd resources; \
		$(XMKCERT) localhost 127.0.0.1 ::1; \
		$(XMKCERT) -install

	# Windows: 
	# replace with `Read-Host` if using PowerShell
	# else use GitBash/cygwin
	@read -s -p "Password: " password; \
		echo $$password > resources/.password

	@echo Setting up .pfx
	$(XOPENSSL) pkcs12 -export -out resources/certificate.pfx -inkey resources/localhost+2-key.pem -in resources/localhost+2.pem -password file:resources/.password

# Docker
containers-build:
	@echo Building Containers
	docker-compose build

containers-run: containers-build
	@echo Starting App
	docker-compose up -d

containers-restart:
	@echo Restarting....
	docker-compose restart

containers-stop:
	@echo Stopping...
	docker-compose down

containers-status:
	docker-compose ps

containers-logs:
	docker-compose logs --follow

containers-clean: 
	@echo Cleaning containers...
	docker-compose down --rmi all

# Native 
native-build-app:
	cd app/; npm install --legacy-peer-deps --loglevel warn

native-build-api:
	cp resources/local.settings.json api/local.settings.json
	cd api/; \
	python3 -m venv .venv; \
	source $(XVENVACTIVATE); \
	pip install -r requirements.txt

native-run-app-secure: native-build-app
	cd app/; \
	npm run develop -- --https --cert-file ../resources/localhost+2.pem --key-file ../resources/localhost+2-key.pem
	$(XOPEN) "https://localhost:8000"

native-run-api-secure: native-build-api
	cd api/; \
	source $(XVENVACTIVATE); \
	pip list; \
	func start --useHttps \
		--cert ../resources/certificate.pfx \
		--password ../resources/.password

native-run-app-insecure:
	@echo Make sure `local.settings.json` is using `http`, _not_ `https`
	cd app/; npm run develop

native-run-api-insecure:
	cd api/; func start

native-clean:
	@echo 1/2: Cleaning Client
	rm -rf app/node_modules
	rm -rf app/.cache
	rm -rf app/public

	@echo 2/2: Cleaning APIs
	rm -rf api/.venv
	rm -rf api/__pycache__

# Utiltiies
launch: certs-setup containers-run
	@echo Launch "https://localhost:8000"
	$(XOPEN) "https://localhost:8000"

new-data-access-endpoint:
	@read -p "Endpoint: " endpoint; \
	if [ ! -z "$$endpoint" ]; then \
		./scripts/create-da-handler.sh $$endpoint; \
	fi;
