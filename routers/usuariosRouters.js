const express = require('express')
const router = express.Router()
const UsuariosController = require('../controllers/usuariosController.js')

router.get('/',UsuariosController.consultar)


router.post('/',UsuariosController.ingresar)

router.route('/:id')
    .get(UsuariosController.consultarDetalle)


    .put(UsuariosController.actualizar)

    .delete(UsuariosController.borrar)


module.exports = router
