FROM node:16-alpine3.15 as service

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 5000
CMD ["yarn", "start"]