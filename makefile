build:
	docker-compose build 

up: 
	make down
	-make rmi
	npm run build
	docker-compose up -d --build
	docker-compose logs --follow

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

down: 
	docker-compose down

run: 
	ts-node src/app.ts

createnetwork:
	docker network create example-net

rmi:
	docker rmi -f $$(docker images --filter "reference=*linkcollect*" -q) 

rmiall: 
	docker rmi -f $$(docker images -q)