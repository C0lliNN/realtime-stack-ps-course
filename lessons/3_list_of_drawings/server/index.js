const r = require('rethinkdb');
const io = require('socket.io')();

function createDrawing({ connection, name }) {
  r.table('drawings')
    .insert({
      name,
      timestamp: new Date()
    })
    .run(connection)
    .then(() => console.log('created with drawing with name: ', name));
}

function subscribeToDrawings({ client, connection }) {
  r.table('drawings')
    .changes({ includeInitial: true })
    .run(connection)
    .then((cursor) => {
      cursor.each((err, drawingRow) => {
        client.emit('drawing', drawingRow.new_val);
      });
    });
}

r.connect({
  host: 'localhost',
  port: 28015,
  db: 'awesome_whiteboard'
}).then((connection) => {
  io.on('connection', (client) => {
    client.on('createDrawing', ({ name }) => {
      createDrawing({ connection, name });
    });

    client.on('subscribeToDrawings', () => {
      subscribeToDrawings({ client, connection });
    });
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
