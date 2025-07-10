# node image
FROM node:20-alpine

# container working directory
WORKDIR /app

# dependencies
COPY package*.json ./
RUN npm install

# copy the rest of the application code
COPY . .    

# expose the port the app runs on
EXPOSE 3000 

# start the application
CMD ["node", "server.js"]