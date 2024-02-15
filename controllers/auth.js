const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email }); // Comprueba si el email esta en la bd
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado.'
            });
        }

        // Cogemos la respuesta y empezamos a validar
        const usuario = new Usuario(req.body);
        // Encriptamos contraseña
        const salt = bcrypt.genSaltSync(); // para generar numeros de manera aleatoria 
        usuario.password = bcrypt.hashSync(password, salt) // Encriptamos
        // Guaradmos el usuario en DB
        await usuario.save();
        // Generamos mi JWT Json Web Token
        const token = await generarJwt(usuario.id)
        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }


}
const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email }); // Comprueba si el email esta en la bd
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay registros de esas credenciales.'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password); // Validamos el password
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay registros de esas credenciales.'
            });
        }
        const token = await generarJwt(usuario.id) // Generar JWT 
        // Respuesta correcta, mandamos usuario y token
        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error de autenticación.'
        })
    }
}
const renewToken = async (req, res = response) => {
    // cogemos lo que viene en el request que se establece en el validar-jwt.js
    const uid = req.uid;
    // Generar JWT nuevo
    const token = await generarJwt(uid);
    // Comprueba si el uid esta en la bd y obtiene el usuario
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        usuario,
        token
    })
}


module.exports = { crearUsuario, login, renewToken }