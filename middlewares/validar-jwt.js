const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header('x-token'); // el token viene en los headers

    if (!token) {
        return res.status(401).json({ // 401 unauthorized 
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // al verificar el token contra la clave secreta de env, extraemos el uid
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        // Establecemos en la respuesta el uid del usuario para manejarlo facilmente en el front
        req.uid = uid;
        // para que pase al siguiente validador y acabe la peticion
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


}



module.exports = { validarJWT }