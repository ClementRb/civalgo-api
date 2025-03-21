FROM node:alpine

WORKDIR /app
COPY . .

COPY prisma ./prisma/

RUN apk update && apk add bash

RUN npm install

EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "run", "start:dev"]
