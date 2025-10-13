const express = require('express')
const router = express.Router()
const verificarClave = require('../middlewares/autenticacion.js')
const productosControllers = require('../controllers/productosControllers.js')

router.get('/',productosControllers.consultarProductos)

router.post('/',verificarClave,productosControllers.agregarProducto)

router.route('/:id')
    .get(productosControllers.consultarProductosDetallado)
    .put(verificarClave,productosControllers.actualizarProducto)
    .delete(verificarClave,productosControllers.eliminarProducto)




module.exports = router;