FROM mongo:latest

RUN mkdir -p /data/test && chown -R mongodb:mongodb /data/test
WORKDIR /data/test

COPY ./docker/mongo/testData .

RUN mongoimport --db example-database --collection ExampleProject --type json --file exampleData.json --jsonArray
