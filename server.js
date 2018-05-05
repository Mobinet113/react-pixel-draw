const express = require('express');
const http    =  require('http');
const socketServer = require('socket.io');

const app = express();
var serve = http.createServer(app);
var io    = socketServer(serve);

serve.listen(5000, () => { console.log("+++ Pixel Grid Express Server Running +++") });

const pixelState = () => {
  let defaultPixelFormation = [];

  for ( let i = 0; i < 2500; i++ ){
    defaultPixelFormation.push({key: i, colour: "#FFF"});
  }

  return defaultPixelFormation;
};

/***************************************************************************************** */
/** Socket logic starts here																                                 */
/***************************************************************************************** */
const connections = [];
const initialState = pixelState();

io.on('connection', function (socket) {

  console.log("Connected to Socket - " + socket.id);
  connections.push(socket);

  socket.on('disconnect', function(){
    console.log('Disconnected - '+ socket.id);
  });

  socket.on('loadInitialPixels', () => {
    console.log("Loading initial pixels");
    io.emit( 'loadInitialPixels', initialState);
  });

  socket.on('updatePixel', (addData) => {

    addData.user = socket.id;

    initialState[addData.id].colour = addData.colour;

    console.log("Pixel Updated ", addData);
    socket.broadcast.emit("updatePixel", addData)
  });

});