# react base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# required dependencies
COPY package*.json ./
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE 5173

# start the application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]