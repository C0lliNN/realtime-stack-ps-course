import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToDrawings(cb) {
  socket.on('drawing', drawing => cb(drawing));
  socket.emit('subscribeToDrawings');
}


function createDrawing(name) {
  socket.emit('createDrawing', { name });
}

function publishLine({ drawingId, line }) {
  socket.emit('publishLine', { drawingId, ...line });
}

function subscribeToDrawingLines(drawingId, cb) {
  socket.on(`drawingLine:${drawingId}`, line => cb(line));
  socket.emit('subscribeToDrawingLines', drawingId)
}

export {
  publishLine,
  createDrawing,
  subscribeToDrawings,
  subscribeToDrawingLines
};