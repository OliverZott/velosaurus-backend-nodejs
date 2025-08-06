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

To debug in vs code:

- `ctrl + shift + p` -> Debug: Toggle Auto Attach Always + `npm run dev`

### test api

To test API you can use collection *rest-api.postman_collection.json* with **Postman**.

REST API endpoints:

- GET `http://localhost:3000/api/activity`
- GET `http://localhost:3000/api/location`

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
