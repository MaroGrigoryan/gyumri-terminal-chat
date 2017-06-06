 'use strict';
const net = require('net');
const socket = net.Socket();
const program = require('commander');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
let clients = [];
let nickname = '';
let nickcolor = '#2300ff';
// Basic layout for blessed

const screen = blessed.screen({
  autoPadding: true,
    smartCSR: true
});




screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


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


clients.push(sock);
    // Data event handler for this socket
    sock.on('data', data => {
      for(let i of clients){
        i.write(data);

        
      }
    });

  }).listen(parsedArguments.port, parsedArguments.location);

}else{

  const log = contrib.log(
        { fg: "green"
        , label: 'Chat window'
        , height: "20%"
        , tags: true
        , border: {type: "line", fg: "cyan"} });
  screen.append(log);

  const chatlog = contrib.log(
        { fg: "green"
        , top: '25%'
        , label: 'messages'
        , height: "40%"
        , tags: true
        ,track: {bg: 'yellow'}
        , border: {type: "line", fg: "cyan"} });
  screen.append(chatlog);
  //Connecting to socket
  socket.connect(parsedArguments.port, parsedArguments.location, () => {
      //Send message to socket server



  const form = blessed.form({
      parent: log,
      name: 'form',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
  });

  const input = blessed.textarea({
      parent: form,
      name: 'input',
      inputOnFocus: true,
      input: true,
      keys: true,
      top: 0,
      left: 0,
      height: 1,
      width: '100%',
      style: {
          fg: 'white',
          bg: 'black',
          focus: {
              bg: 'red',
              fg: 'white'
          }
      }
  });


  const prompt = blessed.Prompt({
    name: 'prompt',
    top:'70%',
    width:'30%',
    inputOnFocus: true,
    input: true,
    keys: true,
    border: {type: "line", fg: "cyan"}
  });
  const bar = blessed.listbar({
    bottom: 0,
    height:'20%',
    left: 3,
    right: 3,
    mouse: true,
    keys: true,
    autoCommandKeys: true,
    border: 'line',
    vi: true,
    style: {
      bg: 'green',
      item: {
        bg: 'red',
        hover: {
          bg: 'blue'
        },
        //focus: {
        //  bg: 'blue'
        //}
      },
      selected: {
        bg: 'blue'
      }
    },
    commands: {
      'red' :{
        callback: function() {
          nickcolor='#f72929';
          bar.hide();
            input.focus();
          }
      },
      'blue': function() {
        nickcolor='#2300ff';
        bar.hide();
          input.focus();
      },
      'green': function() {
        nickcolor='#e8ff00';
        bar.hide();
          input.focus();
      }
    }
  });
  screen.append(bar);
  bar.toggle();
  screen.append(prompt);
prompt.focus();
prompt.input('nickname','',(err,value)=>{
//  the most  difficult part
// 8 hours  of suffer
//THUG LIFE
nickname = value;
bar.show();
bar.focus();
 socket.write(JSON.stringify({message:'has joined to chat',nickname,nickcolor}));
 });





  input.key('enter', ()=>{
  socket.write(JSON.stringify({message:input.getValue(),nickname,nickcolor}));
  input.clearValue();
  });
  //Connecting to socket
  socket.connect(parsedArguments.port, parsedArguments.location, () => {  //Send message to socket server


  });

  //Event for receiving data from server
  socket.on('data', data=>{

      chatlog.log(` {${nickcolor}-fg}${JSON.parse(data).nickname}{/} ${JSON.parse(data).message}`);

  });


});



  }



//Rendering our UI :)
screen.render();
