### Build image
FROM node:18.12.1-buster-slim AS build

WORKDIR /home/node
ENV YARN_CACHE_FOLDER=/var/yarn

ARG BACKEND_URL

COPY --chown=node:node turbo.json package.json yarn.lock ./
COPY --chown=node:node ./packages /home/node/packages
COPY --chown=node:node ./apps/web /home/node/apps/web/

RUN \
  apt update -qq && \
  apt install -qq -y tini && \
  apt autoremove -qq -y && \
  apt-get -qq clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/log/* && \
  yarn config set network-timeout 600000 -g && \
  yarn install --frozen-lockfile && \
  yarn cache clean

WORKDIR /home/node/apps/web

RUN echo "BACKEND_URL=$BACKEND_URL" >> ./.env

WORKDIR /home/node
RUN yarn build:web

### Final image, install production dependencies and do some cleanup
FROM node:18.12.1-buster-slim AS production
WORKDIR /home/node
RUN \
  apt update -qq && \
  apt upgrade -y bash && \
  apt install -qq -y tini && \
  rm -rf /var/lib/apt/lists/*

ENV YARN_CACHE_FOLDER=/var/yarn
ENV NODE_ENV=production

COPY --from=build --chown=node:node /home/node/packages/ ./packages
COPY --from=build --chown=node:node /home/node/apps/web ./apps/web
COPY --from=build --chown=node:node /home/node/apps/web/.next ./.next
COPY --from=build --chown=node:node /home/node/apps/web/public ./public
COPY --chown=node:node /entrypoint.sh .

ARG BACKEND_URL

RUN echo "BACKEND_URL=$BACKEND_URL" > ./.env.production

RUN \
  yarn config set network-timeout 600000 -g && \
  yarn install --production && \
  yarn cache clean

COPY --from=build --chown=node:node /home/node/node_modules ./node_modules

USER node
EXPOSE 3000

RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["./entrypoint.sh"]

# This runs tini as the init system, which will pass signals (HUP etc) to pid 1
# ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["apps/web/node_modules/.bin/next", "start"]

