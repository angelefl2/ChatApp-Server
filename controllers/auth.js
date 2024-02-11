const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

const crearUsuario = async (req, res = response) => {

    const { email , password } = req.body;
    try {

        const existeEmail = await Usuario.findOne({ email }); // Comprueba si el email esta en la bd
        if (existeEmail) {

            return res.status(400).json({
                ok : false,
                msg : 'El correo ya está registrado.'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptamos contraseña
        const salt  = bcrypt.genSaltSync(); // para generar numeros de manera aleatoria 
        usuario.password = bcrypt.hashSync(password, salt) // Encriptamos
        
        // Guaradmos el usuario en DB
        await usuario.save();

        res.json({
            ok: true,
            usuario
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }


}


module.exports = { crearUsuario }