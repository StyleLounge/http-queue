FROM node:10-alpine
WORKDIR /app

# The npm token is required to install private dependencies
ARG NPM_REGISTRY_TOKEN
ARG CI

# global, preliminary steps
RUN echo '//registry.npmjs.org/:_authToken=${NPM_REGISTRY_TOKEN}' > ~/.npmrc

COPY package.json package-lock.json ./
COPY scripts scripts
RUN ./scripts/setup

# app-related files
COPY src src
COPY tsconfig.json tslint.json .nycrc ./
RUN ./scripts/build

ENTRYPOINT ["This is a module, there's no point in trying to run it"]
CMD [""]
