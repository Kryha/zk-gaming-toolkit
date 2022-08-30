FROM node:16-alpine as build

RUN apk --no-cache add --update git make g++ rustup pkgconfig openssl libressl-dev

RUN rustup-init -y

ENV PATH="$PATH:/root/.cargo/bin"

RUN rustup update

RUN git clone https://github.com/AleoHQ/aleo.git
RUN cd aleo && cargo install --path .

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

COPY contracts/ ./contracts/
COPY src/ ./src/

RUN yarn
RUN yarn build

EXPOSE 5001

CMD [ "yarn", "start" ]
