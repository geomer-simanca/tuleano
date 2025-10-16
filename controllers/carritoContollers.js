const supabase = require('../database/conexion.js')

class CarritoController{

    constructor(){}

    async consultarCarritos(req,res){
        try{

            const {data,error} = await supabase
                .from('carros')
                .select('*')
            
            if (error) throw error

            res.json({
                msj:'se ha logrado conectar con la base de datos',
                data:data
            })
        }catch (error){

            res.status(500).json({
                msg:'hubo un error en la peticion',
                error:error.message
            })

        }
    }

    async agregarCarrito(req,res){
        try{

            const {id_usuario} = req.body

            if (!id_usuario){
                return res.status(400).json({
                    msg:`no se ha agregado el id del usuario`
                })
            }

            const {data,error} = await supabase
                .from('carros')
                .insert([
                    {id_usuario}
                ])
                .select('*')
                .single()
                

            if (error) throw error

            res.status(201).json({
                msg:`se creo el carrito correctamente`,
                data:data
            })

        }catch(error){

            res.status(500).json({
                msg:`error al crear el nuevo carro`,
                error:error.message
            })

        }
    }

    async consultaEspesifica(req,res){
        try{

            const {id} = req.params

            const {data,error} = await supabase
                .from('carros')
                .select('*')
                .eq('id_carro',id)
                .single()

            if (error) throw error

            res.status(200).json({
                msg:`estos son los datos del carro ${id}`,
                data:data
            })



        }catch(error){

            res.status(500).json({
                msg:`no se ha podido consultar el carro ${req.params.id}`,
                error:error.message
            })

        }
    }

    async actualizarCarrito(req,res){
        try{

            const {id} = req.params

            const {id_usuario} = req.body

            if (!id_usuario) {return res.status(400).json({msg:`es nesezario ingresar el id_usuario`})}

            const {data,error} = await supabase
                .from('carros')
                .update({id_usuario})
                .eq('id_carro',id)
                .select('*')
            
                
            if (error) throw error

            res.status(200).json({
                msg:`se actualizao la informacion del carro ${id}`,
                data:data
            })

        }catch(error){
            res.status(500).json({
                msg:`error al actualizar el carrito ${req.params.id}`,
                error: error.message
            })

        }
    }

    async eliminarCarrito(req,res){
        try{

            const {id} = req.params

            const {error} = await supabase
                .from('carros')
                .delete()
                .eq('id_carro',id)
            
            if (error) throw error

            res.status(200).json({
                msg:`se elimino el usuario correctamente`
            })

        }catch(error){
            res.status(500).json({
                msg:`no se pudo actualizar el carrito ${req.params.id}`,
                error:error.message
            })
            
        }
    }



}

module.exports = new CarritoController()