FROM node:16-bullseye as build

RUN apt update
RUN apt install git make g++ pkg-config openssl libssl-dev

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="$PATH:/root/.cargo/bin"

RUN rustup update

RUN git clone https://github.com/AleoHQ/leo
RUN cd leo && cargo install --path .

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

COPY leocontracts/ ./leocontracts/
COPY src/ ./src/

COPY resources.tar.gz /root/.aleo/resources.tar.gz
RUN tar -xzvf /root/.aleo/resources.tar.gz -C /root/.aleo/

RUN rm -rf leocontracts/build/
RUN rm -rf leocontracts/inputs/
RUN rm -rf leocontracts/outputs/
RUN cd leocontracts && leo build

RUN yarn
RUN yarn build

EXPOSE 5001

CMD [ "yarn", "start" ]
