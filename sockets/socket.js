const { comprobarJwt } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensajeBD } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', async (client) => {

    const [valido, uid] = comprobarJwt(client.handshake.headers['x-token']) // Comprobar token de usuario
    // Verifica autenticación
    if (!valido) return client.disconnect(); // Rechazarlo si no tiene token valido

    // Cliente autenticado
    usuarioConectado(uid);
    client.emit('welcome', "BIENVENIDO AL SERVER: " + uid);

    // Cliente concreoto -> client.id
    // Ingresar al usuario a una sala en particular
    client.join(uid)

    // Sala individual -> Mensaje a un usuario concreto client.uid
    //client.to(uid)


    client.on('mensaje-personal', async (payload) => {
        await grabarMensajeBD(payload);
        // devuelve el mensaje a una persona en concreto segun el uid que entra si lo ha grabado en bd
        io.to(payload.para).emit('mensaje-personal', payload);
    });



    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });


    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});