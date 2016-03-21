#!/usr/bin/env node

"use strict";

const MiddlewareDocs = require('./middleware-docs');
const argv = require('minimist')(process.argv.slice(2));
if (!argv._.length) {
  throw new Error('dist is required');
}

const path = require('path');
const config = require(path.resolve(process.cwd(), argv._[0], 'middleware.json'));
const docs = new MiddlewareDocs({
  routers: config.routes,
});

if (argv.out || argv.o) {
  const fs = require('fs');
  fs.writeFileSync(
    path.resolve(process.cwd(), argv.out || argv.o),
    docs.render(),
    'utf8'
  );
} else {
  process.stdout.write(docs.render() + '\n');
}
