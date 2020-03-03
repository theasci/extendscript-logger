#!/bin/bash

DIRECTORY=$(cd `dirname $0` && pwd)

"$DIRECTORY/../node_modules/extendscript-repl/run.rb" -b "$DIRECTORY/../index.jsx"
