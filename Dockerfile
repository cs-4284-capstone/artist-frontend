## Build stage image
FROM node:lts-alpine as build-stage

# install project dependencies first
RUN npm install -g http-server
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# copy rest of project and build
COPY . .
RUN yarn build:prod

## Prod stage image
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]