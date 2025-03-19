FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY CLOUD-CONTAINER2/ /app/
CMD ["node", "server.js"]
EXPOSE 9090
