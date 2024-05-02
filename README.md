# With Docker Compose

This project is copied from this [repo](https://github.com/vercel/next.js/tree/canary/examples/with-docker-compose)

This example contains everything needed to get a Next.js development and production environment up and running with Docker Compose.

## Benefits of Docker Compose

- Develop locally without Node.js or TypeScript installed ✨
- Easy to run, consistent development environment across macOS, Windows, and Linux teams
- Run multiple Next.js apps, databases, and other microservices in a single deployment
- Multistage builds combined with [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) outputs up to 85% smaller apps (Approximately 110 MB compared to 1 GB with create-next-app)
- Easy configuration with YAML files

## How to use

```bash
yarn create next-app --example with-docker-compose with-docker-compose-app
```

Optionally, after the installation is complete:

- Run `cd next-app`, then run `yarn install` to generate a lockfile.

It is recommended to commit a lockfile to version control. Although the example will work without one, build errors are more likely to occur when using the latest version of all dependencies. This way, we're always using a known good configuration to develop and run in production.

## Prerequisites

Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.
Install volta
Install nodejs ^18

## Development

First, run the development server:

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build dev
docker compose -f docker-compose.dev.yml build

# Up dev
docker compose -f docker-compose.dev.yml up

cd next-app
yarn dev

or

yarn start:dev # this runs inside docker
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Production

Multistage builds are highly recommended in production. Combined with the Next [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) feature, only `node_modules` files required for production are copied into the final Docker image.

First, run the production server (Final image approximately 110 MB).

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build prod
docker compose -f docker-compose.prod.yml build

# Up prod in detached mode
docker compose -f docker-compose.prod.yml up -d
```

Alternatively, run the production server without multistage builds (Final image approximately 1 GB).

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build prod without multistage
docker compose -f docker-compose.prod-without-multistage.yml build

# Up prod without multistage in detached mode
docker compose -f docker-compose.prod-without-multistage.yml up -d
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)
```

//

Find IP Address of docker container

docker ps

```
CONTAINER ID   IMAGE                                     COMMAND                  CREATED          STATUS          PORTS     NAMES
dec023e3be90   with-docker-compose-app-next-app:latest   "docker-entrypoint.s…"   22 seconds ago   Up 22 seconds             zealous_germain
```

docker inspect -f "{{ .NetworkSettings.IPAddress }}" [container-name-or-id]

```
172.17.0.2
```

confirm server ip is correct by pinging container using bash

ping -c 3 [ip-address]

```
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.

--- 172.17.0.2 ping statistics ---
3 packets transmitted, 0 received, 100% packet loss, time 2068ms
```

connect to docker container

ssh [username]@[ip-address]
ssh github@146.190.5.77

// --

sudo su - username

sudo adduser

--- stripe
