const express = require('express')
const app = express()
const usuariosRouters = require('./routers/usuariosRouters.js')
const venderoresRouters = require('./routers/vendedoresRouters.js')
app.use(express.json())


app.use('/usuarios',usuariosRouters)
app.use('/vendedores',venderoresRouters)

PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('hola mundo')
})




app.listen(PORT, ()=>{
    console.log(`servidor escuchando por el puerto ${PORT}`)
})
