# Overview

extendscript-logger provides file logging functionality to Adobe applications that can use ExtendScript.

# Installation

Simply install it like any other npm package.

```sh
npm install extendscript-logger

```

Add the following code to any ExtendScript (`*.jsx`) file you want to have a Logger instance available.

```js
var Global = Global || {};
Global.rootPath = new File($.fileName).parent;
$.evalFile(Global.rootPath + '/node_modules/extendscript-logger/index.jsx');
var Glogal.logger = new Logger(Global.rootPath+'/log/test.log', 'DEBUG');
```

# Usage

Logger provides the following methods for logging output.

```js
Glogal.logger.debug('Debug message');
Glogal.logger.info([1, "Random string"]);
Glogal.logger.notice({foo:"bar"});
Glogal.logger.warn("Danger, Will Robinson!");
Glogal.logger.error("Crap! Something went wrong.");
Glogal.logger.critical("DEFCON 1! Seek shelter.");
```

# Testing

`npm test` or `test/run`.

Output should look like:

```
me@host extendscript-logger|master$ test/run
2020-03-03T11:44:99|INFO|***************************
2020-03-03T11:44:00|INFO|Jasmine ExtendScript Runner
2020-03-03T11:44:00|INFO|***************************
2020-03-03T11:44:00|WARN|To prevent odd errors, usually methods not being defined, login into Adobe Creative Cloud and verify all modal dialog boxes are closed. If tests are not running as expected, try restarting the application.
2020-03-03T11:44:00|INFO|Loading all specs in /Users/spyle/projects/extendscript-logger/test/spec
2020-03-03T11:44:49|INFO|20 specs, 0 failures
2020-03-03T11:44:49|INFO|Finished in 0.469 seconds
```

# NPM Release Tasks

1. Update `package.json` version number
1. `npm install` to update package lock.
1. Ensure tests pass.
1. Update `CHANGELOG.md` with changes since last release.
1. Check them all into the repository.
1. `git tag -a <version> -m <version>; git push --tags`
1. `npm publish` to deploy the release to npm.
