FROM node:16.19

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]