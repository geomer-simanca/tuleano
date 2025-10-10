const express = require('express')
const router = express.Router()
const supabase = require('../database/conexion.js')
const vendedorescontrollers = require('../controllers/vendedoresControllers.js')


router.get('/',vendedorescontrollers.consultarVendedores)


router.post('/',vendedorescontrollers.agregarVendedor)

router.route('/:id')
    .get(vendedorescontrollers.consultarVendedor)

    .put(vendedorescontrollers.actualizarVendedor)

    .delete(vendedorescontrollers.eliminarVendedor)



module.exports = router