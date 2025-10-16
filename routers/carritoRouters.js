const express = require('express')
const router = express.Router()
const carritoContollers = require('../controllers/carritoContollers.js')
const autenticacion = require('../middlewares/autenticacion.js')

router.get('/',carritoContollers.consultarCarritos)

router.post('/',autenticacion,carritoContollers.agregarCarrito)


router.route('/:id')
    .get(carritoContollers.consultaEspesifica)
    .put(autenticacion,carritoContollers.actualizarCarrito)
    .delete(autenticacion,carritoContollers.eliminarCarrito)

module.exports = router