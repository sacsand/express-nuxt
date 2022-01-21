FROM node:14-alpine3.14

# create destination directory
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/web/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
# RUN npm run build

# expose 3000 on container
EXPOSE 8080

