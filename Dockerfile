FROM node:14-alpine3.12

ENV INTERNAL_STATUS_PORT=8001

WORKDIR /app

COPY package.json package-lock.json .
RUN npm install --loglevel warn

COPY scripts ./scripts
COPY src ./src
COPY static ./static
COPY gatsby-config.js gatsby-node.js ./

EXPOSE 8000
CMD [ "npm", "run", "develop" ]
