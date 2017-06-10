# Workbench

## Quick-Start

1. run `gulp` to activate the build watches and browser with live reloading
2. as you build files in `/src`, results appear in `/builds/development`

## Overview

What it does:

- opens chrome window to localhost:3000
- \*.jade in /src  ==>  \*.html in outputDir
- index.js + deps in /src  ==>  index.js in outputDir
- \*.scss files in /src  ==>  main.css in outputDir
- create server on port:3000 with live reloading
- recompile if .jade, .js or .scss files in /src are updated

## Usage
For optimal workflow, before starting your project run 'gulp' to activate the build watches and browser with live reloading.

## Jade

## JavaScript
index.js, along with all its dependencies, are compliled into a single index.js thanks to Browserify. This new index.js includes source mapping by default (but disabled in production mode). It is also minified when compliled in production mode.

## Sass

