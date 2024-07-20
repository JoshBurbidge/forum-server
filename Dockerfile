FROM node:20.15.1

WORKDIR /app

USER node

COPY node_modules ./node_modules
COPY package.json package-lock.json ./
COPY public ./public
COPY bin ./bin
COPY config ./config
COPY lib ./lib

EXPOSE 3000

ENTRYPOINT [ "node" ]
CMD [ "./bin/www" ]

# docker run -it --rm -v "$HOME/.aws:/root/.aws" -p 127.0.0.1:3000:3000 forum-server
# docker run -it --rm -v "$HOME/.aws:/home/node/.aws" -p 127.0.0.1:3000:3000 forum-server