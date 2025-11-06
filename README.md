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

To debug in vs code run `Debug Program` in the debug tab or use the command `npm run debug`.

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

or use docker compose:

- `docker compose up --build`
- `docker compose down`

### Docker remarks

- build with default node:24 base image -> Imagesize: 1.85 GB
- build with node:24-slim base image -> Imagesize: 515 MB
- build with node:24-alpine base image -> Imagesize: 418 MB

## Deployment

### On "render" platform

Running live on [render](https://dashboard.render.com/)

- `https://velosaurus-backend-nodejs.onrender.com/api/activity/1`

### Deployment using PM2 on own server

On production server:

- `npm install -g pm2`
- `npm run build:prod` - Install deps, build, and cleanup for production
- `pm2 start ecosystem.config.js --env production` - Start with PM2 (production mode)
- `pm2 save` - Save PM2 configuration
- `pm2 startup` - Setup auto-start on boot
- Check status
  - `pm2 list`
  - `pm2 describe aw-backend`
  - `pm2 logs aw-backend`

If new app version:

- Pull and build first
  - `git pull origin mai`n
  - `npm run build:prod`
- `pm2 reload aw-backend` Reload
- `pm2 logs aw-backend --lines 20` Verify

### PM2 Common Commands

```bash
# Start/Stop/Restart
pm2 start ecosystem.config.js --env production  # Start with production config
pm2 stop aw-backend                            # Stop the app
pm2 restart aw-backend                         # Restart the app
pm2 delete aw-backend                          # Stop and remove from PM2 list

# Monitoring
pm2 list                                       # List all processes
pm2 describe aw-backend                        # Detailed info about the app
pm2 logs aw-backend                           # View logs (real-time)
pm2 logs aw-backend --lines 50                # View last 50 log lines
pm2 monit                                     # Real-time monitoring dashboard

# Management
pm2 save                                       # Save current process list
pm2 startup                                    # Generate startup script
pm2 resurrect                                  # Restore saved processes
pm2 reload aw-backend                         # Zero-downtime restart
pm2 flush                                     # Clear all logs

# Stop all processes
pm2 stop all                                  # Stop all apps
pm2 delete all                                # Delete all apps
```

# Setup

## Remarks - project Setup

- `npm init -y`
- `npm i -D typescript ts-node express cors @types/node @types/express @types/cors`
- `tsc --init`
- `npm i typeorm reflect-metadata sqlite3` ...SQLite dependencies (reflect-metadata might not be necessary in the future [npm-package](https://www.npmjs.com/package/reflect-metadata))
- `npm i nodemailer @types/nodemailer`  ...Mail dependencies
- `npm i dotnenv`
