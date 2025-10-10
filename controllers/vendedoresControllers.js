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
                return res.status(400).jsonson({msg:'los nuevos usuarios deben de tener id_usuario,nombre_tienda,descripcion,estado'})
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

    actualizarVendedor(req,res){
        res.send({msg:'desde aqui se actualiza los datos de los vendedores'})

    }

    eliminarVendedor(req,res){
        const  {id}  = req.params
        res.send({msg:`se desea eliminar al vendedor ${id}`})

    }

}


module.exports = new VendedoresController()