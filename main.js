var app = require('express')(),
        express = require('express'),
        http = require('http').createServer(app),
        io = require('socket.io')(http),
        srp = require('serialport'),
        SerialPort = srp.SerialPort,
        porta_http = 8000,
        sp = new SerialPort('/dev/ttyACM0', {
            baudRate: 115200,
            parser: srp.parsers.readline("\n")
        });

app.use(express.static(__dirname + '/view'));
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

sp.on("data", function(data) {
    console.log(JSON.parse(data));
    io.emit('dados', JSON.parse(data));
});

io.on('connection', function(socket) {

    socket.on('Led', function(d) {
        sp.write(d);
        console.log(d);
    });

});

sp.on('close', function(err) {
    console.log('Servidor Desligado!');
});
sp.on('error', function(err) {
    console.error('Erro', err);
});
sp.on('open', function() {
    console.log('Servidor conectado: http://localhost:' + porta_http);
});

http.listen(porta_http);
