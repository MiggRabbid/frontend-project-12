lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

build:
	rm frontend/build -rf
	npm run build

start:
	make start-backend & make start-frontend