ARG ZK_GAMING_ALEO

FROM $ZK_GAMING_ALEO as build

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

# TODO: build and publish programs to snarkos
# COPY contracts/ ./contracts/

# RUN rm -rf contracts/**/outputs/
# RUN rm -rf contracts/**/inputs/

# RUN cd contracts/boloney_match && leo build
# RUN cd contracts/boloney_match_summary && leo build
# RUN cd contracts/dice && leo build
# RUN cd contracts/power_up && leo build
# RUN cd contracts/rng && leo build

RUN yarn
RUN yarn build

EXPOSE 5001

CMD [ "yarn", "start" ]
