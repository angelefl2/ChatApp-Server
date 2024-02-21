const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    console.log('Conectado: ' + uid);
    return usuario;

}

const usuarioDesconectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    console.log('Desconectado: ' + uid);
    return usuario;
}

const grabarMensajeBD = async (payload) => {

    /* payload : 
        {
            de : '',
            para : '',
            texto : '' 
        }
    */

    try {
        const mensaje = new Mensaje(payload)
        await mensaje.save(); // Guarda en bd
        return false;
        
    } catch (err) {
        return false;
    }
}



module.exports = {
    usuarioConectado, usuarioDesconectado, grabarMensajeBD
}