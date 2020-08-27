FROM node:12-alpine
RUN mkdir -p /var/app
COPY ./ /var/app
WORKDIR /var/app
RUN npm install