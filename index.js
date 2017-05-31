'use strict';

const net = require('net');
const socket = net.Socket();
const program = require('commander');
const blessed = require('blessed');
const contrib = require('blessed-contrib');


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
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Data event handler for this socket
    sock.on('data', data => {
        console.log('Data ' + sock.remoteAddress + ': ' + data);

        // Send data back to client socket
        sock.write('Data sent: "' + data + '"');

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', data => {
        console.log('Closed: ' + sock.remoteAddress +' '+ sock.remotePort);
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
      console.log('Data: ' + data);
      // Close the client socket
      socket.destroy();
  });

  // Add a 'close' event handler for the client socket
  socket.on('close', () => {
      console.log('Connection closed');
  });
}
