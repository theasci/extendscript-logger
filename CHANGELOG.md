# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

# 0.3.2 - 2022-05-17

## Added

1. Added `valid` logging level.

# 0.3.1 - 2020-12-05

## Fixed

1. Fixed log time output to use seconds, not fractional seconds. 

# 0.3.0 - 2020-03-12

## Changed

1. Swapped out `lib/json2.js` for [extendscript-json](https://github.com/theasci/extendscript-json).

# 0.2.1 - 2020-03-03

## Changed

1. Updated [jasminejsx](https://github.com/theasci/jasminejsx) to version 0.2.0 to handle new `Global` object.

# 0.2.0 - 2020-03-03

## Changed

1. `index.jsx` will attempt to get the rootPath from a `Global.rootPath` before looking at a global `rootPath` variable. `README.md` has been updated accordingly.

## Added

1. Added `script/repl.sh` that uses [extendscript-repl](https://github.com/theasci/extendscript-repl) so that we can play around with and test values.

# 0.1.1 - 2019-10-23

## Added

1. TypeScript definitions by [@lumenn](https://github.com/lumenn)

# 0.1.0 - 2019-10-21

## Changed

1. Refactor Logger variables that should be private. Additional tests ensure logging level is met before outputting to the file.

## Removed

1. The log ID outputted on each line. This value becomes confusing if the log isn't wiped and is latter written to with a different Logger. instance.

# 0.0.2 - 2019-10-17

## Changed
1. Swap logger construct parameters. Log path is likely to be used more than level.

# 0.0.1 - 2019-10-17

## Added
1. Initial concept used with [jasminejsx](https://github.com/theasci/jasminejsx).
