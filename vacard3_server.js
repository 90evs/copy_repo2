var fs = require('fs');
var http = require('http');
var server = http.createServer();
var client_current_id = 1;

server.on('request', function(req, res) {
  var stream = fs.createReadStream('vacard3.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});
var io = require('socket.io')(server);
server.listen(8000);

io.sockets.on('connection', function(socket) {
    console.log('connect')
    io.emit('init', {id:client_current_id++});
    socket.on('client_img_click', function(img_coord){
        console.log('client_img_click', img_coord);
        io.emit('server_img_click', img_coord);
    });
    socket.on('debug_print', function(data){
        console.log('debug_print', data);
    });
    
  });
