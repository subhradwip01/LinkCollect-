build:
	docker-compose build 

up: 
	make down
	-make rmi
	docker-compose up -d --build
	docker-compose logs --follow

up-dev: 
	docker-compose up -d --build
	docker-compose logs --follow

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d  --build
	docker-compose logs --follow

down: 
	docker-compose down

run: 
	npm run dev

createnetwork:
	docker network create example-net

rmi:
	docker rmi -f $$(docker images --filter "reference=*linkcollect*" -q) 

rmiall: 
	docker rmi -f $$(docker images -q)