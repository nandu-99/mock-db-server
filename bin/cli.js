#!/usr/bin/env node

const yargs = require('yargs');
const JSONDatabaseServer = require('../lib/server');

const argv = yargs
  .option('file', {
    alias: 'f',
    description: 'Path to the JSON database file',
    type: 'string',
    demandOption: true,
  })
  .option('port', {
    alias: 'p',
    description: 'Port to run the server',
    type: 'number',
    default: 3000,
  })
  .option('delay', {
    alias: 'd',
    description: 'Response delay in milliseconds',
    type: 'number',
    default: 0,
  })
  .help()
  .alias('help', 'h')
  .argv;

const server = new JSONDatabaseServer(argv.file, argv.port, argv.delay);
server.start();
