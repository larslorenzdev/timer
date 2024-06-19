FROM node:20 as build

WORKDIR /app

COPY . .
RUN corepack enable
RUN yarn install
RUN yarn generate

FROM caddy:2

COPY --from=build /app/.output/public /usr/share/caddy

EXPOSE 80

CMD [ "caddy", "run", "--config", "/etc/caddy/Caddyfile" ]