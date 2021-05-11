FROM node:12-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock tsconfig.json ./
COPY src ./src
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN npm install 
RUN npm run build

EXPOSE 8080
CMD /wait && npm start