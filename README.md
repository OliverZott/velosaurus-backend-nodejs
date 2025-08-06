# Velosaurus Backend - nodejs version

Just a simple nodejs version of dummy velosaurus backend project.

## Prerequisites

- nodejs
- sqlite

- create .env file with:

```txt
EMAIL_USER="max.mustermann@mail.com"
EMAIL_PASS="awesomePassword"
SMTP_HOST=host
SMTP_PORT=666
```

## Run application

- `npm install`
- `npm run seed:data` to seed database
- `npm run start`
- <http://localhost:3000/api/activity>
- <http://localhost:3000/api/location>

## Debug/Test application

### debug

To debug in vs code run "Debug Program" in the debug tab or use the command `npm run debug`.

### test api

To test API you can use collection *rest-api.postman_collection.json* with **Postman**.

REST API endpoints:

- GET `http://localhost:3000/api/activity`
- GET `http://localhost:3000/api/location`

## Linting

[ts-eslint docs](https://typescript-eslint.io/users/configs/)

- Manual setup:
  - `npm install --save-dev eslint @eslint/js typescript typescript-eslint`
  - create `eslint.config.mjs`
- Interactive setup `npm init @eslint/config@latest`
- If necessary install jiti... `npm install --save-dev jiti`

Run linter:

- `npx eslint .`
- or `npm run lint`

## Docker

- Build the Docker image `docker build -t velosaurus-backend-nodejs .`
- Run the Docker container first time `docker run -p 3000:3000 --name velosaurus-backend-node velosaurus-backend-nodejs`
- Start / Stop container `docker start velosaurus-backend-node` / `docker stop velosaurus-backend-node`
- Remove container `docker container rm velosaurus-backend-node`

### Docker remarks

- build with default node:24 base image -> Imagesize: 1.85 GB
- build with node:24-slim base image -> Imagesize: 515 MB
- build with node:24-alpine base image -> Imagesize: 418 MB

## Deployment

Running live on [render](https://dashboard.render.com/)

- `https://velosaurus-backend-nodejs.onrender.com/api/activity/1`

# Setup

## Remarks - project Setup

- `npm init -y`
- `npm i -D typescript ts-node express cors @types/node @types/express @types/cors`
- `tsc --init`
- `npm i typeorm reflect-metadata sqlite3` ...SQLite dependencies (reflect-metadata might not be necessary in the future [npm-package](https://www.npmjs.com/package/reflect-metadata))
- `npm i nodemailer @types/nodemailer`  ...Mail dependencies
- `npm i dotnenv`
