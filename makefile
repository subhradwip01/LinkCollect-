up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

down: 
	docker-compose down

run: 
	ts-node src/app.ts

createnetwork:
	docker network create example-net