FROM node:18-alpine as build

WORKDIR /usr/main/

RUN yarn set version 2 --only-if-needed

COPY .yarnrc.yml ./.yarnrc.yml
COPY yarn.lock ./yarn.lock
COPY .yarn/ ./.yarn/
COPY .pnp.cjs/ ./.pnp.cjs
COPY .pnp.loader.mjs ./.pnp.loader.mjs

COPY package.json ./package.json

COPY .eslintignore ./.eslintignore
COPY .eslintrc.json ./.eslintrc.json

COPY tsconfig.json ./tsconfig.json

COPY src/ ./src/

RUN yarn
RUN yarn build

EXPOSE 5001

CMD [ "yarn", "start" ]
