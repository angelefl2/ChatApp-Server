const { comprobarJwt } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
   
    const [valido, uid] = comprobarJwt(client.handshake.headers['x-token']) // Comprobar token de usuario
    if (!valido) return client.disconnect(); // Rechazarlo si no tiene token valido
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });


    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});