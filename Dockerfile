FROM node:16-bullseye as build

RUN apt update
RUN apt install git make g++ pkg-config openssl libssl-dev

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

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

RUN rm -rf contracts/gamingTk/build/
# initial call to random is needed so it downloads a bunch of useful packages
# TODO: seems like files are still being downloaded every time and calls to the API are failing, find a better solution for this issue
RUN cd contracts/gamingTk/ && aleo build && aleo run random 2u32 3u32

RUN yarn
RUN yarn build

EXPOSE 5001

CMD [ "yarn", "start" ]
