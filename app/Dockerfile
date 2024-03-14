FROM node:18 AS builder

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - "https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz" | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

FROM node

WORKDIR /node/app

COPY --from=builder /usr/local/bin/dockerize /usr/local/bin/dockerize
COPY index.js .
COPY package.json .

RUN npm install

EXPOSE 3000