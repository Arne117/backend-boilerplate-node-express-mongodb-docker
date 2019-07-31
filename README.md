# Docker NodeJS MongoDB Backend API
Based on [Bret Fischer's node docker good defaults](https://github.com/BretFisher/node-docker-good-defaults)

## Install
Install [Docker](https://www.docker.com/get-started)

#### Optional
To import test data: 
```bash
docker cp ./docker/mongo/testData/exampleData.json <ContainerName>:/tmp/exampleData.json
docker exec <ContainerName> mongoimport --db example-database --collection ExampleProject --type json --file /tmp/exampleData.json --jsonArray
```
Syntax
`mongoimport --db <DB_NAME> --collection <DB_COLLECTION> --type json --file <TESTDATA>.json --jsonArray`

## Run
Start with: `docker-compose up -d`

Node server listens on Port `8081`.

Logs: `docker-compose logs -f node`

Add npm package while docker-compose is running:

`docker-compose exec -w /opt/node_app node npm install --save <package name>`


## Documentations
Logging: [Winston](https://github.com/winstonjs/winston)  
Environment variables: [dotenv](https://github.com/motdotla/dotenv)  
MongoDB object modeling: [mongoose](https://mongoosejs.com/)  
Express framework: [express](https://expressjs.com/de/4x/api.html)

## Linter
[standardJS](https://standardjs.com/)

## Extensions
[Request body validation](https://ciphertrick.com/request-body-validations-joi-expressjs/)

#### Docker NodeJS best practices
[here](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
