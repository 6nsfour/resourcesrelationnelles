FROM node:20.11.0-bullseye
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
ENTRYPOINT .