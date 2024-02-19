const { response } = require('express');
const Usuario = require('../models/usuario');


const getUsuarios = async (req, res = response) => {

    // para añadir desde que numero de usuario en la respuesta vamos a enviar. Esto es lo que se pone en la url al final del endpoint despues de la ?. Por ejemplo: localhost:3000/api/usuarios?desde=5
    const desde = Number(req.query.desde) || 0;


    // Esta peticion devuelve todos los usuarios ordenados descentemente por el campo online (arriba los true)
    // el find tiene un filtro que dice que el _id tiene que ser diferente de req.uid $ne -> Non existent
    // El req.uid viene del middleware que verifica el token
    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        //.skip(desde) // Ignora los primeros "x" usuarios que saca en la consulta
        .limit(20) // Limita el resultado a 5 usuarios 
        

    res.json({
        ok: true,
        usuarios
      //  desde
    })
}


module.exports = { getUsuarios }

