# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

# 0.1.0 - Unreleased

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
