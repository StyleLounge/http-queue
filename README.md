# @style/http-queue [![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version) [![wercker status](https://app.wercker.com/status/fdcda89323df1030a7581504bef3c4ad/s "wercker status")](https://app.wercker.com/project/bykey/fdcda89323df1030a7581504bef3c4ad)

A fire-and-forget HTTP request queue implementation for browsers.

## Installation

```sh
npm i --save @style/http-queue
```

## Usage example

```js
import queue from '@style/http-queue';

async () => {
    const { schedule, drain } = queue();

    // Schedule some HTTP requests
    schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {character: 'Almec'}});
    schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {character: 'Amee'}});
    schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {character: 'Darth Bane'}});
    schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {character: 'Beed'}});
    schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {character: 'Sio Bibble'}});
    schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {character: 'Dengar'}});
    schedule({verb: 'POST', url: 'http://analytics.stylelounge.de', data: {character: 'Feral'}});

    // Let's drain the queue ("waits" until all requests has been sent OR terminates after configurable
    // timeout; default = 3000 ms)
    await drain();
};
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

### Semantic commit messages

This project follows a pattern, called [semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages). By using this convention it is possible to infer the next version number based on the last commit messages when creating a new release.
