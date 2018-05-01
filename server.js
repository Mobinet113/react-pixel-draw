const express = require('express');
const http    =  require('http');
const socketServer = require('socket.io');

const app = express();
var serve = http.createServer(app);
var io    = socketServer(serve);

serve.listen(5000,()=> { console.log("+++ Pixel Grid Express Server Running +++") });

/***************************************************************************************** */
/** Socket logic starts here																                                 */
/***************************************************************************************** */
const connections = [];

io.on('connection', function (socket) {

  console.log("Connected to Socket - " + socket.id);
  connections.push(socket);

  socket.on('disconnect', function(){
    console.log('Disconnected - '+ socket.id);
  });

  // 		.cursor()
  // cursor.on('data',(res)=> {socket.emit('initialList',res)})

  socket.on('loadInitialPixels', () => {
    console.log("Loading initial pixels");
    io.emit( [{key: 0, colour: "red"}] );
  });

  socket.on('updatePixel', (addData) => {
    console.log("Pixel Updated ", addData);
    io.emit("Pixel Updated ", addData)
  });

});