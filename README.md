# Workbench
A front-end workspace that promotes utility and
readability.

## Quick-Start

1. Clone repo:
    git clone https://github.com/sam-well/workbench
1. `cd` into the repo and `npm install`
1. run `gulp`. This activates:
    - the development server,
    - a browser window with live reloading, and
    - build watches that update and compile your templates
1. Create files: (default files are added for quick-starts)
    - Pug templates in `src/templates`,
    - JavaScript files in `src/js`, and
    - Sass/SCSS files in `src/sass`
1. Files update in the browser as you save, and your templates (.pug, .js, and
   .sass/scss) compile to a single, minified file each. Default output directory
   is `builds/development`

## Overview

What it does:

- opens chrome window to localhost:3000
- \*.pug in /src  ==>  \*.html in outputDir
- index.js + deps in /src  ==>  index.js in outputDir
- \*.scss files in /src  ==>  main.css in outputDir
- create server on port:3000 with live reloading
- recompile if .pug, .js or .scss files in /src are updated

### JavaScript

index.js, along with all its dependencies, are compliled into a single index.js thanks to Browserify. This new index.js includes source mapping by default (but disabled in production mode). It is also minified when compliled in production mode.


