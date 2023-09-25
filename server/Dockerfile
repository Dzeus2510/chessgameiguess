FROM node:18-alpine
#choose node 18 alpine as base image
WORKDIR /app
#Set working directory to /app, if not exist, it will be created
COPY package.json ./
#Copy content from package.json, due to Docker layer caching, the package.json doesnt change much, which make rebuilding much faster
RUN npm install
#install all dependencies from the package.json
COPY . .
#Copy the rest of the server into the image
EXPOSE 3001
#EXPOSE inform that the server will listen to port 3001 
CMD [ "node", "index.js"]
#Specify the command that should run when the container, based on this image, start (which is "node index.js")