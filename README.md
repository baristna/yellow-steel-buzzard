# yellow-steel-buzzard
## Quick Run

```sh
docker-compose up -d --build
```

## Usage

- Choose metrics
- Select date-range
- Browse through tabs

## Features

- Display timeline or histogram of repositories
- Dynamic tabs
- Data caching on session storage so there won't be more than once request to the API with the same parameters
- Store parameters in query-string for link share and page refresh support

## Tech

- ReactJS and Hooks
- EmotionJS (Styled Components)
- Axios
- Enviroment variables
- Session Storage
- Highcharts
- Eslint

## Installation with Npm

Install the dependencies and devDependencies and start the app.

```sh
npm i
npm start
```

Open 
```sh
localhost:3000
127.0.0.1:3000
```

Run eslint

```sh
npm run lint
```

with auto-fix

```sh
npm run lint:fix
```


## Run with Docker

By default, the Docker will expose port 3002, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd yellow-steel-buzzard
docker build -t yellow-steel-buzzard .
```

```sh
docker run \
    -itd \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    yellow-steel-buzzard
```

Using docker compose

```sh
cd yellow-steel-buzzard
docker-compose up -d --build
```

Open 
```sh
localhost:3002
127.0.0.1:3002
```
