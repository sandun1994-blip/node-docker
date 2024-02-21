<!-- image build -->

- docker build -t hello-docker .

<!-- image list -->

- docker images

<!-- docker  run  container -->

- docker run -p 3000:3000 -d --name container_name image_name
           machine  : container

<!-- docker  run  container with sync option -->

- docker run -v path_to_folder_on_location:path_to_folder_on_container -p 3000:3000 -d --name container_name image_name
           machine  : container        

- path_to_folder_on_container = C:\projects\Docker season 2\hello-docker
- path_to_folder_on_container = /app
# docker run -v C:\projects\Docker season 2\hello-docker:/app  -p 3007:3005 -d --name node-app node-app-image 
# docker run -v  %cd%:/app  -p 3007:3005 -d --name node-app node-app-image (window shell)
# docker run -v  ${pwd}:/app  -p 3007:3005 -d --name node-app node-app-image (power shell)
# docker run -v  $(pwd):/app  -p 3007:3005 -d --name node-app node-app-image (mac or linux)

* only read not sycnc without node_modules
# docker run -v  ${pwd}:/app:ro -v /app/node_modules -p 3007:3005 -d --name node-app node-app-image

* WE CAN SET ENV VALUE IN COMMAND

# docker run -v  ${pwd}:/app:ro -v /app/node_modules -p --env PORT=3007 3007:3005 -d --name node-app node-app-image

- docker run -it hello-docker-tag sh

<!--SEASON  -->

<!-- constainer list -->

- docker ps

<!-- delete image -->

- docker image rm image_Id

 <!-- delete container -->

- docker rm container_name -f

<!-- check container file -->

- docker exec -it node-app bash or sh  or /bin/sh

<!-- docker logs -->
- docker logs conatainer_name

<!-- docker logs live -->
- docker logs conatainer_name -f

<!-- CONECT ENV FILE -->
- docker run -v  ${pwd}:/app:ro -v /app/node_modules  --env-FILE ./.env -p 3007:3005 -d --name node-app node-app-image

<!-- DELETE UNNECCRY VOLUME -->
- docker volume prune

<!-- COMPOSE FILE RUN -->

- docker-compose up -d

<!-- COMPOSE  STOP -->
- docker-compose down -v

<!-- SPECIPIC FILE COMPOSE UP-->
- docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

<!-- SPECIPIC FILE COMPOSE DOWN -->
- docker-compose -f docker-compose.yml -f docker-compose.dev.yml  down -v


<!-- DOCKER REBUILD IN PRODUCTION ENV -->
- docker-compose -f docker-compose.yml -f docker-compose.prod.yml  up -d --build


<!-- INSPECT -->
- docker inspect hello_docker-mongo-1

<!-- Scaling -->

- docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2

