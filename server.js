var express = require('express');
var app = express();

var server = app.listen(3333);

// Socket.io sử dụng chung cổng với server
var io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  var id = socket.id;

  // Emit sự kiện tới 1 socket duy nhất
  // io.emit(event_name, value {obj}) sẽ emit sự kiện tới mọi socket
  
  socket.on('mousemove', data => {
    data.id = id;
    io.emit('moving', data);
  });

  socket.on('disconnect', () => {
    io.emit('disconnect', id);
  });
});
