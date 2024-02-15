// Path -> api/login

const { Router } = require('express');
const { crearUsuario, login, renewToken,  } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty().isEmail(),
    validarCampos
], crearUsuario)
router.post('/', [
    check('email', 'El correo es obligatorio').not().isEmpty().isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)

// validarJWT es un middleware, renew token es la funcion auth
// un middelware es un paso intermedio (validacion), si se pasa la validacion, se llama a la funcion renewtoken, sino peta y no se continua.
router.get('/renew', validarJWT, renewToken);



module.exports = router;