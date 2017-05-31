'use strict';

const program = require('commander');

//Parsing CLI passed arguments
program
  .version('0.0.1')
  .option('-s, --service [optional]', 'Add service')
  .option('-l, --location [optional]', 'Location of server')
  .option('-p, --port [optional]', 'Location of server')
  .parse(process.argv);

//Setting default arguments if empty
const parsedArguments = {
  service: (program.service) ? program.service : "client",
  location: (program.location) ? program.location : "location",
  port: (program.port) ? program.port : "5000"
}
