# standard default image (https://hub.docker.com/_/node#image-variants)
FROM node:24  
# dockerimage as small as possible
# FROM node:24-alpine 
# only minimal packages to run node
# FROM node:24-slim  

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]