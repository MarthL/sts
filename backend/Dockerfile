FROM node:16.19
WORKDIR /backend
COPY package*.json ./
RUN npm install bcryptjs
RUN npm install
COPY . .

EXPOSE 8081

CMD ["npm", "run", "start:dev"]