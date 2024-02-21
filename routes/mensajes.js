// path: /api/mensajes

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

const router = Router();

router.get('/:de', validarJWT, obtenerChat); // de = parametro que se manda a controllers/mensajes.js 


module.exports = router;