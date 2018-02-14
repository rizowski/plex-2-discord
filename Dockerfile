#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:carbon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

VOLUME ["/usr/src/app/config"]

EXPOSE 80

CMD ["npm", "start"]
