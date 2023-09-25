FROM node:18-alpine
#Using node 18 alpine ,so both server and client have the same images version
WORKDIR /app
#Choose the app directory as workdir
COPY package*.json ./
#Copy all of package.json
RUN npm install
#Install all dependancies
COPY src/ ./src/
COPY public/ ./public/
#Only copy necessary file into the image
EXPOSE 3000
#Listening to port 3000
CMD ["npm", "start"]
#Start Command