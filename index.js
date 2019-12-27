/*ESCRIBIENDO EL SERVIDOR*/

/*CONFIGURAR EXPRESS*/
const path = require('path');
const express = require('express');
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 2000);

//STATIC FILES
app.use(express.static(path.join(__dirname , 'public')));


//START THE SERVER
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
    });

const socketio = require('socket.io');
const io = socketio(server);

//WEB SOCKETS
io.on('connection', (socket) => {
console.log('new conection', socket.id);

socket.on('chat:message', (data)=>{
io.sockets.emit('chat:message' , data);

});

socket.on('chat:typing', (data)=>{
socket.broadcast.emit('chat:typing', data);
});
});


