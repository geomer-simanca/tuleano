require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const usuariosRouters = require('./routers/usuariosRouters.js')
const venderoresRouters = require('./routers/vendedoresRouters.js')
const productosRouters = require('./routers/productosRouters.js')
const carritoRuter = require('./routers/carritoRouters.js')

// Habilita CORS para todos
app.use(cors());

app.use(express.json())


app.use('/usuarios',usuariosRouters)
app.use('/vendedores',venderoresRouters)
app.use('/productos',productosRouters)
app.use('/carritos',carritoRuter)

PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('hola mundo')
})




app.listen(PORT, ()=>{
    console.log(`servidor escuchando por el puerto ${PORT}`)
})
