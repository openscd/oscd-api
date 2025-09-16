# Changelog

## [0.1.5](https://github.com/openscd/oscd-api/compare/oscd-api-v0.1.4...oscd-api-v0.1.5) (2025-09-16)


### Bug Fixes

* typedoc should point to src/oscd-api.ts instead of oscd-api.ts ([b009b45](https://github.com/openscd/oscd-api/commit/b009b45c3ea4434940216992b8ece12b47428380))

## [0.1.4](https://github.com/openscd/oscd-api/compare/oscd-api-v0.1.3...oscd-api-v0.1.4) (2025-09-15)


### Features

* move code to /src folder ([e81699b](https://github.com/openscd/oscd-api/commit/e81699b2529b7fbfd94dc7452fe15d5f5b01d36f)), closes [#49](https://github.com/openscd/oscd-api/issues/49)
* rename project to openscd/oscd-api ([aec1eae](https://github.com/openscd/oscd-api/commit/aec1eaecc15efec47695c486049c88cb5fa54a10)), closes [#51](https://github.com/openscd/oscd-api/issues/51)


### Bug Fixes

* change pkg name from @opensc/oscd-api to @openscd/oscd-api ([e21acc5](https://github.com/openscd/oscd-api/commit/e21acc500543d703f56d9dfb26acbe1d914eafcc))

## [0.1.3](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.1.2...oscd-api-v0.1.3) (2025-07-29)


### Bug Fixes

* edit-event sending oscd-edit-v2 event ([146f2ec](https://github.com/OMICRONEnergyOSS/oscd-api/commit/146f2ecb303b2a7e6a12b2037a08ce154951879b))

## [0.1.2](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.1.1...oscd-api-v0.1.2) (2025-07-22)


### Features

* add plugin interface (shell constraint to APIs) ([ad9a3d0](https://github.com/OMICRONEnergyOSS/oscd-api/commit/ad9a3d0a61fd5f27acf5bd8ca5b781acb049ad65))
* correct plugin "version" prop and expose type ([20c7d79](https://github.com/OMICRONEnergyOSS/oscd-api/commit/20c7d797adb2806240395f85d473a8309a974385))

## [0.1.1](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.1.0...oscd-api-v0.1.1) (2025-07-09)


### Bug Fixes

* isSetAttribute to allow attr OR attrNS ([de6ed66](https://github.com/OMICRONEnergyOSS/oscd-api/commit/de6ed66453f26415f6cc5c6e332e7a1b8bb647d0))

## [0.1.0](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.14...oscd-api-v0.1.0) (2025-06-18)


### ⚠ BREAKING CHANGES

* **package:** move utils to separate module

### Features

* add edit-event from V1 API ([07230e3](https://github.com/OMICRONEnergyOSS/oscd-api/commit/07230e352ad616df98c50df66e5701fe70fcfac9))
* add OpenEvent ([af43dbe](https://github.com/OMICRONEnergyOSS/oscd-api/commit/af43dbe5d681de31e81bbf0be5b60079ce2112f3))


### Bug Fixes

* **convertEdit:** allow '__proto__' attribute name ([16c541f](https://github.com/OMICRONEnergyOSS/oscd-api/commit/16c541fd2f856f05373e771c97ee8a881fe3e7b9))
* expose missing module members ([477f11c](https://github.com/OMICRONEnergyOSS/oscd-api/commit/477f11c4ef337b9763a933c5f087303c7f6599f0))
* increase type guard vigilance ([5404d79](https://github.com/OMICRONEnergyOSS/oscd-api/commit/5404d796c683488db2cc145f6d6ceb2888ffa94d))


### Code Refactoring

* **package:** move utils to separate module ([b1e5c51](https://github.com/OMICRONEnergyOSS/oscd-api/commit/b1e5c51e233cf0f4627ba5b6bc69cb58041647d0))

## [0.0.14](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.13...oscd-api-v0.0.14) (2025-06-16)


### Bug Fixes

* prevent doc, coverage & commitlint.config.js from npm package ([17416a8](https://github.com/OMICRONEnergyOSS/oscd-api/commit/17416a8c98481a399ccb088ee1d9632ed78be376))

## [0.0.13](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.12...oscd-api-v0.0.13) (2025-06-16)


### Bug Fixes

* prevent built test files from being bundled in npm package ([a7f8ce0](https://github.com/OMICRONEnergyOSS/oscd-api/commit/a7f8ce0bd96c1419289e813748591fca6376b420))

## [0.0.12](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.11...oscd-api-v0.0.12) (2025-06-16)


### Features

* add convertEdit ([bfce8e4](https://github.com/OMICRONEnergyOSS/oscd-api/commit/bfce8e4caeab6a93099d5922bccfc431f2c29373))

## [0.0.11](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.10...oscd-api-v0.0.11) (2025-06-13)


### Features

* add api + interfaces ([7253d02](https://github.com/OMICRONEnergyOSS/oscd-api/commit/7253d02905ad011cdb736520036be3c9d415f32e))
* add generated docs to github pages ([f7fea8d](https://github.com/OMICRONEnergyOSS/oscd-api/commit/f7fea8d559f59b538270d10892495579a3de5729))


### Bug Fixes

* (workflows/release-please): npm package contains no files ([5866856](https://github.com/OMICRONEnergyOSS/oscd-api/commit/5866856cb6edcd3515a2dfe550a895e312d5d5d6))

## [0.0.9](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.8...oscd-api-v0.0.9) (2025-06-10)


### Features

* add api + interfaces ([7253d02](https://github.com/OMICRONEnergyOSS/oscd-api/commit/7253d02905ad011cdb736520036be3c9d415f32e))
* add generated docs to github pages ([f7fea8d](https://github.com/OMICRONEnergyOSS/oscd-api/commit/f7fea8d559f59b538270d10892495579a3de5729))

## [0.0.2](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.1...oscd-api-v0.0.2) (2025-06-10)


### Features

* add api + interfaces ([7253d02](https://github.com/OMICRONEnergyOSS/oscd-api/commit/7253d02905ad011cdb736520036be3c9d415f32e))
* add generated docs to github pages ([9c6ed88](https://github.com/OMICRONEnergyOSS/oscd-api/commit/9c6ed882e56ddf358b23a73049a043bd80bb8e78))
* **workflows/release-please:** allow manual release trigger ([9c6ed88](https://github.com/OMICRONEnergyOSS/oscd-api/commit/9c6ed882e56ddf358b23a73049a043bd80bb8e78))


### Bug Fixes

* **workflows/release-please:** publish to npmjs registry ([9c6ed88](https://github.com/OMICRONEnergyOSS/oscd-api/commit/9c6ed882e56ddf358b23a73049a043bd80bb8e78))

## [0.0.2](https://github.com/OMICRONEnergyOSS/oscd-api/compare/oscd-api-v0.0.1...oscd-api-v0.0.2) (2025-06-06)


### Features

* add api + interfaces ([7253d02](https://github.com/OMICRONEnergyOSS/oscd-api/commit/7253d02905ad011cdb736520036be3c9d415f32e))
