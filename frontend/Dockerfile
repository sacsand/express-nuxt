FROM node:14-alpine3.14

# create destination directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/api/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
# RUN npm run build

# expose 3000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

