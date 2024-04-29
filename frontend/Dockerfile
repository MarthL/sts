FROM node:latest

WORKDIR /app

RUN apt-get update && apt-get install -y \
  build-essential \
  python3

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]