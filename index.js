'use strict';

const net = require('net');
const socket = net.Socket();
const program = require('commander');
const blessed = require('blessed');
const contrib = require('blessed-contrib');

// Basic layout for blessed
const screen = blessed.screen();
const log = contrib.log(
      { fg: "green"
      , label: 'Chat window'
      , height: "40%"
      , tags: true
      , border: {type: "line", fg: "cyan"} });
screen.append(log);

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
  location: (program.location) ? program.location : "localhost",
  port: (program.port) ? program.port : "5000"
}



//TODO: Separate into modules
if(parsedArguments.service == "server") {

  //Start a TCP Server
  net.createServer( sock => {
    // Show socket object ID -> Unique
    log.log('Connected: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Data event handler for this socket
    sock.on('data', data => {
        log.log('Data ' + sock.remoteAddress + ': ' + data);

        // Send data back to client socket
        sock.write('Data sent: "' + data + '"');

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', data => {
        log.log('Closed: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

  }).listen(parsedArguments.port, parsedArguments.location);

}else{

  //Connecting to socket
  socket.connect(parsedArguments.port, parsedArguments.location, () => {
      //Send message to socket server
      socket.write('Hey');
  });

  //Event for receiving data from server
  socket.on('data', data => {
      log.log('Data: ' + data);
      // Close the client socket
      socket.destroy();
  });

  // Add a 'close' event handler for the client socket
  socket.on('close', () => {
      //Red log
      log.log("{red-fg}Connection closed{/red-fg}");
  });
}

//Rendering our UI :)
screen.render();
