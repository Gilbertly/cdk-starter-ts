FROM node:12-alpine
RUN mkdir -p /var/app
ADD . /var/app
WORKDIR /var/app
RUN npm install