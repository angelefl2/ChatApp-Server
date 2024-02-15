const jwt = require('jsonwebtoken');

const generarJwt = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h' // tiempo de validez del token
        }, (err, token) => {
            if (err) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT')
            } else {
                // TOKEN!
                resolve(token)
            }
        })
    });
}

const comprobarJwt = (token = '') => {

    try {
        // al verificar el token contra la clave secreta de env, extraemos el uid
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        // Establecemos en la respuesta el uid del usuario para manejarlo facilmente en el front
        return [true, uid];


    } catch (error) {
        return [false, null]
    }


};


module.exports = {
    generarJwt, comprobarJwt
}