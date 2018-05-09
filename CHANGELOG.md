# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.1.2"></a>
## [3.1.2](https://github.com/StyleLounge/http-queue/compare/v3.1.1...v3.1.2) (2018-05-09)



<a name="3.1.1"></a>
## [3.1.1](https://github.com/StyleLounge/http-queue/compare/v3.1.0...v3.1.1) (2018-05-09)


### Bug Fixes

* adapts scripts to current generator state STYLE-10657 ([3cab175](https://github.com/StyleLounge/http-queue/commit/3cab175))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/StyleLounge/http-queue/compare/v2.0.1...v3.1.0) (2018-05-09)


### Bug Fixes

* [STYLE-7116] fix missing semicolon. ([0d9154c](https://github.com/StyleLounge/http-queue/commit/0d9154c))
* [STYLE-7116] Fixed handling of sendBeacon and add tests for validating it. ([84dd370](https://github.com/StyleLounge/http-queue/commit/84dd370))
* [STYLE-7116] Implemented the fetch API for sending request without Content-Length header. ([a3bab27](https://github.com/StyleLounge/http-queue/commit/a3bab27))
* [STYLE-7116] refactor the tests and rename the ID generator as requested in PR. ([71804f8](https://github.com/StyleLounge/http-queue/commit/71804f8))
* [STYLE-7116] removed async/await and fixed related issues as mentioned in the PR. ([cfade07](https://github.com/StyleLounge/http-queue/commit/cfade07))
* adapts scripts to current generator state STYLE-10657 ([703c608](https://github.com/StyleLounge/http-queue/commit/703c608))
* adds 'show dir output' steps to wercker file STYLE-10657 ([4faa5f7](https://github.com/StyleLounge/http-queue/commit/4faa5f7))
* adds ci-toolkit STYLE-10657 ([82543dd](https://github.com/StyleLounge/http-queue/commit/82543dd))
* make scripts executable STYLE-10657 ([0be0f4e](https://github.com/StyleLounge/http-queue/commit/0be0f4e))
* sendBeacon problem ([35b6bf2](https://github.com/StyleLounge/http-queue/commit/35b6bf2))
* STYLE-10657 expose private type action ([ccc1b63](https://github.com/StyleLounge/http-queue/commit/ccc1b63))
* STYLE-10657 remove style-types ([b4832d8](https://github.com/StyleLounge/http-queue/commit/b4832d8))
* STYLE-10657 revert sinon, tslint ([67d60f6](https://github.com/StyleLounge/http-queue/commit/67d60f6))
* STYLE-10657 spelling ([d3a863f](https://github.com/StyleLounge/http-queue/commit/d3a863f))
* STYLE-10657 update wercker.yml for a working ci ([d9745b3](https://github.com/StyleLounge/http-queue/commit/d9745b3))
* STYLE-10657 upgrade typescript in order to compile code ([fbec6cb](https://github.com/StyleLounge/http-queue/commit/fbec6cb))
* STYLE-10657 use typeroots and reorder exports ([2c1ea9f](https://github.com/StyleLounge/http-queue/commit/2c1ea9f))


### Features

* adds forceXHR option to createHttpQueue STYLE-10657 ([0105e84](https://github.com/StyleLounge/http-queue/commit/0105e84))
* finishes wercker file STYLE-10657 ([35b7067](https://github.com/StyleLounge/http-queue/commit/35b7067))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/StyleLounge/http-queue/compare/v2.0.0...v2.0.2) (2017-01-11)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/StyleLounge/http-queue/compare/v1.2.0...v2.0.0) (2017-01-11)


### Bug Fixes

* resolve promise after finishing the HTTP request ([91a1730](https://github.com/StyleLounge/http-queue/commit/91a1730))


### Features

* mechanism for draining the queue ([e08db49](https://github.com/StyleLounge/http-queue/commit/e08db49))


### BREAKING CHANGES

* Signature of the factory function has changed



<a name="1.3.1"></a>
## [1.3.1](https://github.com/StyleLounge/http-queue/compare/v1.2.0...v1.3.1) (2017-01-09)


### Bug Fixes

* resolve promise after finishing the HTTP request ([91a1730](https://github.com/StyleLounge/http-queue/commit/91a1730))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/StyleLounge/http-queue/compare/v1.1.1...v1.2.0) (2016-09-15)


### Features

* fallback to XHR when the `sendBeacon` request failed ([6a71d00](https://github.com/StyleLounge/http-queue/commit/6a71d00))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/StyleLounge/http-queue/compare/v1.1.0...v1.1.1) (2016-08-18)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/StyleLounge/http-queue/compare/v1.0.1...v1.1.0) (2016-08-18)


### Features

* makes files available under MIT license ([d9ec90d](https://github.com/StyleLounge/http-queue/commit/d9ec90d))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/StyleLounge/http-queue/compare/v1.0.0...v1.0.1) (2016-07-25)


### Bug Fixes

* add full function body in order to prevent exposing internal interface ([d0138d4](https://github.com/StyleLounge/http-queue/commit/d0138d4))



<a name="1.0.0"></a>
# 1.0.0 (2016-07-25)


### Chores

* add warning flag for the commit message validator ([27c4a1b](https://github.com/StyleLounge/http-queue/commit/27c4a1b))


### Features

* integrate debugging utility ([ba5e472](https://github.com/StyleLounge/http-queue/commit/ba5e472))
* localStorage abstraction with TTL support ([95b2fda](https://github.com/StyleLounge/http-queue/commit/95b2fda))
* prevent git hooks when creating a release ([c632d16](https://github.com/StyleLounge/http-queue/commit/c632d16))
* replace manual action creator definition ([f8f693f](https://github.com/StyleLounge/http-queue/commit/f8f693f))
* specs for testing the reducer function ([b97db29](https://github.com/StyleLounge/http-queue/commit/b97db29))
* switch to `http-client` implementation because it does not throw the weird warning ([22ac2a8](https://github.com/StyleLounge/http-queue/commit/22ac2a8))
* worker implementation ([598c360](https://github.com/StyleLounge/http-queue/commit/598c360))
* worker implementation ([0ee32ea](https://github.com/StyleLounge/http-queue/commit/0ee32ea))


### BREAKING CHANGES

* This will be the release 1.0.0
