const { comprobarJwt } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', async (client) => {

    const [valido, uid] = comprobarJwt(client.handshake.headers['x-token']) // Comprobar token de usuario
    // Verifica autenticación
    if (!valido) return client.disconnect(); // Rechazarlo si no tiene token valido

    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular
    // Sala global -> Todos los usuarios client.id
    client.join(uid)

    // Sala individual -> Mensaje a un usuario concreto client.uid
    //client.to(uid)

    client.on('event', ( payload ) => {
        console.log(payload); 
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});