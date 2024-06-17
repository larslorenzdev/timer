FROM node as base

ARG PORT=3000

WORKDIR /src

# Build
FROM base as build

COPY . .
RUN yarn install
RUN yarn generate

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]