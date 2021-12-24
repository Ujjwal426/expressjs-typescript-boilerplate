#Using lightweight NodeJS alpine image
FROM node:16-alpine

# Create app directory
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

COPY .env.development /home/node/app/ 

RUN npm install

COPY . ./

#Command to start the app
# CMD [ "npm", "start" ]
ENTRYPOINT ["npm", "start"]
