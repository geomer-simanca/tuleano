const express = require('express')
const router = express.Router()
const supabase = require('../database/conexion.js')
const vendedorescontrollers = require('../controllers/vendedoresControllers.js')
const verificarClave = require('../middlewares/autenticacion.js')

router.get('/',vendedorescontrollers.consultarVendedores)


router.post('/',verificarClave,vendedorescontrollers.agregarVendedor)

router.route('/:id')
    .get(vendedorescontrollers.consultarVendedor)

    .put(verificarClave,vendedorescontrollers.actualizarVendedor)

    .delete(verificarClave,vendedorescontrollers.eliminarVendedor)



module.exports = router