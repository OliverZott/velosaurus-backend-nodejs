# Stage 1 - build
FROM node:24 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2 - run production
# FROM node:24-alpine 
FROM node:24-slim 
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

# Pull dummy database
COPY --from=builder /app/data ./data 

EXPOSE 3000
CMD ["node", "dist/index.js"]