FROM node:8.12.0

WORKDIR /usr/src/app
RUN npm install -g yarn
COPY package.json ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
