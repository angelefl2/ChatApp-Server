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


module.exports = {
    generarJwt
}