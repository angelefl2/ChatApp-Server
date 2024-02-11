// Path -> api/login

const { Router } = require('express');
const { crearUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty().isEmail(),
    validarCampos
], crearUsuario)







module.exports = router;