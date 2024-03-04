const { response } = require('express');
const { Op } = require("sequelize");

const usuarioTable = require("../models").Usuario;


const getUsuarios = async (req, res = response) => {

    const usuarios = await usuarioTable.findAll({ where: { id: { [Op.ne]: req.uid } } })

    if (!usuarios) {
        res.status(404).json({
            ok: false,
            msg: 'No se encontraron usuarios'
        });
        
    } else {
        res.json({
            ok: true,
            usuarios: usuarios
        })
    }

    // usuarioTable.findAll()
    //     .then((data) => {
    //         if (data) {
    //             res.json({
    //                 ok: true,
    //                 usuarios: data
    //             })
    //         } else {
    //             res.json({
    //                 ok: false,
    //                 usuarios: "No employee found"
    //             })
    //         }
    //     }).catch((error) => {
    //         res.json({
    //             ok: false,
    //             message: error
    //         })
    //     })
}


module.exports = { getUsuarios }

