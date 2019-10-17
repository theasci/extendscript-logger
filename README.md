# Overview

extendscript-logger provides file logging functionality to Adobe applications that can use ExtendScript.

# Installation

Simply install it like any other npm package.

```
npm intall extendscript-logger

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
