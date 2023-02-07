FROM node:16-bullseye as build

RUN apt update
RUN apt install -y git make g++ pkg-config openssl libssl-dev

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="$PATH:/root/.cargo/bin"

RUN rustup update

RUN git clone https://github.com/AleoHQ/aleo
RUN cd aleo && git checkout 883c4371573a50f2d1517223e6c742a5843db503
RUN cd aleo && cargo install --path .

RUN git clone https://github.com/AleoHQ/leo
RUN cd leo && git checkout 9c83e833f32268fe5d07cadacb15a0f785db44c1
RUN cd leo && cargo install --path .

COPY resources.tar.gz /root/.aleo/resources.tar.gz
RUN tar -xzvf /root/.aleo/resources.tar.gz -C /root/.aleo/
