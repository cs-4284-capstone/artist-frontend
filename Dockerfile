FROM node:lts-alpine

# install project dependencies first
RUN npm install -g http-server
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# copy rest of project and build
COPY . .
RUN yarn build

# heat until golden and serve
EXPOSE 8080
CMD [ "http-server", "dist" ]