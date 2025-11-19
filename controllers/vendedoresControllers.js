const supabase = require('../database/conexion.js')

class VendedoresController{
    constructor(){}

    async consultarVendedores(req,res){
        try{
            const { data, error } = await supabase.from('vendedores').select('*')
            if(error){
                throw error
            }

            res.json({
                msg: 'Consulta de vendedores exitosa',
                vendedores: data,
            })

        }catch (err){
            res.status(500).json({
                msg: 'Error al consultar vendedores',
                error: err.message,
            })
        }

    }

    async consultarVendedor(req,res){

        try{

            const {id} = req.params

            const {data,error} = await supabase
                .from('vendedores')
                .select('id_vendedor,id_usuario,nombre_tienda,descripcion')
                .eq('id_vendedor',id)
                .single()

            if (error){
                if (error.message.includes('No rows')){
                    return res.status(404).json({
                        msg:`no se encontro ningun vendedor con id ${id}`
                    })
                }

                throw error
            }

            res.status(200).json({
                msg:`vendedor con id: ${id} encontrado`,
                usuario: data
            })

            
        }catch(err){

            res.status(500).send({
                msg:`error al consultar al usuario con id: ${req.params.id}`,
                error:err.message               
            })



        }

    }

    async agregarVendedor(req,res){
        
        try{
            const {id_usuario,nombre_tienda,descripcion,estado} = req.body

            if(!id_usuario || !nombre_tienda || !descripcion || !estado){
                return res.status(400).json({msg:'los nuevos usuarios deben de tener id_usuario,nombre_tienda,descripcion,estado'})
            }


            const {data,error} = await supabase
                .from('vendedores')
                .insert([
                    {id_usuario,nombre_tienda,descripcion,estado}
                ])
                .select('*')
                .single()
            
                if (error){
                    throw error
                }

                res.status(201).json({
                    msg:'usuario creado exitosamente',
                    vendedor:data
                })




        }catch(err){

            res.status(500).json({
                msg:'error al crear usuario',
                error: err.message
            })

        }
    }

    async actualizarVendedor(req,res){

        try{

            const {id} = req.params
            const {id_usuario,nombre_tienda,descripcion,estado} = req.body

            if(!id_usuario || !nombre_tienda || !descripcion || !estado){
                return res.status(400).jsonson({msg:'los nuevos vendedores deben de tener id_usuario,nombre_tienda,descripcion,estado'})
            }


            if (!id){
                return res.status(400).json({
                    msg:'Falta el ID del usuario a actualizar'
                })
            }

            const {data,error} = await supabase
                .from('vendedores')
                .update({id_usuario,nombre_tienda,descripcion,estado})
                .eq('id_vendedor',id)
                .select()
            
            if (error) throw error

            if (data.length === 0 ){
                return res.status(404).json({msg:'vendedor no encontrado'})
            }

            res.json({
                msg:'usuario actualizado correctamente',
                usuario: data
            })



        }catch(err){

            res.status(500).json({
                msg:'error al actualizar dato',
                error: err.message
            })

        }
        

    }

    async eliminarVendedor(req,res){
        try{

            const {id} = req.params

            if (!id){
                return res.status(400).json({msg:'debe de agregar un id para eliminar un valor'})
            }

            const {error} = await supabase
                .from('vendedores')
                .delete()
                .eq('id_vendedor',id)
            
            if (error) throw error

            res.status(200).json({msg:`el vendedor ${id} se elimino correctamente`})

        }catch(err){
            res.status(500).json({
                msg:`error al eliminar el vendedor ${req.params.id}`,
                error:err.message
            })

        }

    }

}


module.exports = new VendedoresController()