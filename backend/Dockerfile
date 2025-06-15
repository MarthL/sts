FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install 

RUN mkdir -p node_modules/typeorm-extension/node_modules/@faker-js \
  && ln -s ../../../../@faker-js/faker node_modules/typeorm-extension/node_modules/@faker-js/faker


COPY . .

EXPOSE 3000

CMD ["node", "--trace-warnings", "--enable-source-maps", "node_modules/.bin/nest", "start", "--watch"]