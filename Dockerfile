FROM node:16-bullseye as build

RUN apt update
RUN apt install git make g++ pkg-config openssl libssl-dev

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="$PATH:/root/.cargo/bin"

RUN rustup update

RUN git clone https://github.com/AleoHQ/aleo
RUN cd aleo && git checkout 883c4371573a50f2d1517223e6c742a5843db503
RUN cd aleo && cargo install --path .

RUN git clone https://github.com/AleoHQ/leo
RUN cd leo && git checkout 9c83e833f32268fe5d07cadacb15a0f785db44c1
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

COPY contracts/ ./contracts/
COPY src/ ./src/

COPY resources.tar.gz /root/.aleo/resources.tar.gz
RUN tar -xzvf /root/.aleo/resources.tar.gz -C /root/.aleo/

RUN rm -rf contracts/**/build/
RUN rm -rf contracts/**/outputs/
RUN rm -rf contracts/**/inputs/

RUN cd contracts/boloney_match && leo build
RUN cd contracts/boloney_match_summary && leo build
RUN cd contracts/dice && leo build
RUN cd contracts/power_up && leo build

RUN yarn
RUN yarn build

EXPOSE 5001

CMD [ "yarn", "start" ]
