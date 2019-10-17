# Overview

extendscript-logger provides file logging functionality to Adobe applications that can use ExtendScript.

# Installation

Simply install it like any other npm package.

```sh
npm install extendscript-logger

```

Add the following to code to any ExtendScript (`*.jsx`) file you want to have a Logger instance available.

```js
var rootPath = new File($.fileName).parent;
$.evalFile(rootPath + '/node_modules/extendscript-logger/index.jsx');
var logger = new Logger('DEBUG', rootPath+'/log/test.log');
```

# Usage

Logger provides the following methods for logging output: debug, info, notice, warn, error, critical. 

See the `script/example.jsx` file.


# Testing

`npm test` or `test/run`.

Output should look like:

```
me@host extendscript-logger|master$ test/run
1|2019-10-17T14:41:28|INFO|***************************
2|2019-10-17T14:41:28|INFO|Jasmine ExtendScript Runner
3|2019-10-17T14:41:28|INFO|***************************
4|2019-10-17T14:41:28|INFO|Loading all specs in ~/projects/extendscript-logger/test/spec
5|2019-10-17T14:41:68|INFO|14 specs, 0 failures
6|2019-10-17T14:41:68|INFO|Finished in 0.381 seconds
```
