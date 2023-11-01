FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install --force

EXPOSE 4200

CMD ["npm", "run", "dev"]