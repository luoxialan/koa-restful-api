#/bin/bash

echo Starting to init...
docker-compose pull
docker-compose build --no-cache
docker-compose up --build -d
echo Finished...