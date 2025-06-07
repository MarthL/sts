FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install 


COPY . .

EXPOSE 3000

CMD ["node", "--trace-warnings", "--enable-source-maps", "node_modules/.bin/nest", "start", "--watch"]