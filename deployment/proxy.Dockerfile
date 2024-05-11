# Must be built on arm64 system
FROM --platform=linux/arm64 alpine:3.14

RUN apk add --no-cache git curl build-base

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

RUN cargo install bore-cli

CMD bore local -l $LOCAL_HOST $PORT --to $SERVER_HOST -p $PORT --secret $SECRET

