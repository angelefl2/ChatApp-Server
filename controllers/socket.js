
const Usuario = require("../models").Usuario;
const Mensaje = require("../models").Mensaje;


const usuarioConectado = async (uid = '') => {
    //const usuario = await Usuario.findById(uid);
    const usuario = await Usuario.findOne({ where: { id: uid } })
    usuario.online = true;
    await usuario.save();
    console.log('Conectado: ' + usuario.nombre);
    return usuario;

}

const usuarioDesconectado = async (uid = '') => {
    // const usuario = await Usuario.findById(uid);
    const usuario = await Usuario.findOne({ where: { id: uid } })
    usuario.online = false;
    await usuario.save();
    console.log('Desconectado: ' + usuario.nombre);
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