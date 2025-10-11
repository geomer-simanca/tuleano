const express = require('express')
const router = express.Router()
const UsuariosController = require('../controllers/usuariosController.js')
const verificarClave = require('../middlewares/autenticacion.js')

router.get('/',UsuariosController.consultar)


router.post('/',verificarClave,UsuariosController.ingresar)

router.route('/:id')
    .get(UsuariosController.consultarDetalle)

    .put(verificarClave,UsuariosController.actualizar)

    .delete(verificarClave,UsuariosController.borrar)


module.exports = router
