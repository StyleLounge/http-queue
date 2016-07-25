# @style/http-queue [![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

A fire-and-forget HTTP request queue implementation for browsers.

## Installation

```sh
npm i --save @style/http-queue
```

## Usage example

```js
import queue from '@style/http-queue';

const schedule = queue();

schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {foo: 'bar'}});
```
## Debugging

The library uses the [debug](https://github.com/visionmedia/debug) library internally. You can activate the debug messages by executing the following in your console:

```js
localStorage.debug = '@stylelounge/http-queue:*';
```

## Development

### Available `npm scripts`

| *name* | *description* |
|---|---|
| `npm run build`  | Creates a clean build of this library (installs all `npm packages`, the TS typings and compiles everything). |
| `npm run lint` | Lints the TS code via `tslint`. |
| `npm run test` (a.k.a. `npm test`) | Performs all the tests within the project. |
| `npm run typings` | Installs all the necessary typings |
| `npm run validate-commit-message` | Validates the git commit message before the actual commit action (`pre-commit`). |
| `npm run release` | Creates a new release (fresh build, adjusts the version, adjusts the [changelog](/CHANGELOG.md), creates release tags and pushes everything).

**Note:** `npm run lint` and `npm test` will be executed within a `pre-commit` hook and `npm run validate-commit-message` will be executed when the git commit message has been entered.

### Semantic commit messages

This project follows a pattern, called [semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages). By using this convention it is possible to infer the next version number based on the last commit messages when creating a new release (see `npm run release`).
