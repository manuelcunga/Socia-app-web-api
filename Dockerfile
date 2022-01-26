FROM node:14


WORKDIR /usr/app

COPY package.json ./

RUN yarn install --only=prod


EXPOSE 3000


ENTRYPOINT [ "./start.sh" ] 