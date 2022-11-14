FROM node:18.12-alpine3.16

ENV INTERNAL_STATUS_PORT=8001

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install ----legacy-peer-deps --loglevel warn

COPY src ./src
COPY static ./static
COPY gatsby-config.js gatsby-node.js ./

EXPOSE 8000
CMD [ "npm", "run", "develop" ]
