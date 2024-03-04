//const Mensaje = require('../models/mensaje');
const Mensaje = require("../models").Mensaje;
const { Op } = require("sequelize");


// Devuelve los ultimos 30 mensajes 
const obtenerChat = async (req, res) => {

    const miId = req.uid; // uid del cliente conectado
    const mensajesDe = req.params.de // parametro añadido en mensajes.js: contiene el uid del mensaje del cual queremos el chat

    const last30 = await Mensaje.findAll({
        where: { [Op.or]: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }] },
        order: [['createdAt', 'DESC']],
        limit: 30
    })

    // const last30 = await Mensaje.find({
    //     $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }] // 1*
    // })
    //     .sort({ createdAt: 'desc' }) // los ordenamos de manera descendente en funcion del campo createdAt
    //     .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });
}

module.exports = {
    obtenerChat
}


/*
1* Esto es una condicion para el find(). Como todos los mensajes en base de datos estan juntos, tenemos que filtrar
a la hora de traernos los mensajes que sean todos los que vayan entre dos usuarios concretos, tanto de angel para yolanda como de yolanda para angel. Asi, podemos rellenar la pagina de chat con todos los mensajes entre dos usuarios.
Ademas, limitamos el numero maximo de resultados a 30.

*/




