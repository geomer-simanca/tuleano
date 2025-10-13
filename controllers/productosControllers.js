const supabase = require('../database/conexion.js')

class ProductosControllers{
    constructor(){}

    async consultarProductos(req,res){
        try{

            const {data,error} = await supabase
                .from('productos')
                .select('*')
                
            if (error){
                throw error
            }

            res.json({
                msg:'consulta a productos exitosa',
                productos : data
            })

        }catch (err){

            res.status(500).json({
                msg:'error al consultar productos',
                error: err.message
            })

        }
    }

    async consultarProductosDetallado(req,res){
        try{

            const {id} = req.params

            if (!id){
                return res.status(400).json({
                    msg:'debes de colocar un id de producto'
                })  
            }

            const {data,error}  = await supabase
                .from('productos')
                .select('*')
                .eq('id_producto',id)
                .single()
            
            if (error) throw error

            if (data.length === 0 ){
                return res.status(404).json({msg:'producto no encontrado'})
            }

            res.status(200).json({
                msg:`estos son los datos del producto ${id}`,
                producto:data
            })



        }catch (error){ 
            res.status(500).json({
                msg:`error al averiguar el producto ${req.params.id}`,
                error: error.message
            })

        }
    }

    async agregarProducto(req,res){
        try{

            const {id_vendedor,nombre,descripcion,precio,stock,categoria,imagen_url,estado} = req.body

            if (!id_vendedor||!nombre||!descripcion||!precio||!stock||!categoria||!imagen_url||!estado){
                return res.status(400).json({
                    msg:'para hacer un post debe de tener cada uno de los siguientes valores : id_vendedor,nombre,descripcion,precio,stock,categoria,imagen_url,estado'
                })
            }

            const {data,error} = await supabase
                .from('productos')
                .insert([
                    {id_vendedor,nombre,descripcion,precio,stock,categoria,imagen_url,estado}
                ])
                .select('*')
                .single()

                if (error){
                    throw error;
                }

                res.status(201).json({
                    msg:'producto agrefado correctamente',
                    producto:data
                })

        }catch(error){

            res.status(500).json({
                msg:'error al agregar producto',
                error: error.message
            })

        }

    }

    async actualizarProducto(req,res){
        try{
            const {id} = req.params
            const {id_vendedor,nombre,descripcion,precio,stock,categoria,imagen_url,estado} = req.body
            if (!id_vendedor||!nombre||!descripcion||!precio||!stock||!categoria||!imagen_url||!estado){
                return res.status(400).json({
                    msg:'para hacer un post debe de tener cada uno de los siguientes valores : id_vendedor,nombre,descripcion,precio,stock,categoria,imagen_url,estado'
                })
            }

            const {data,error} = await supabase
                .from('productos')
                .update({id_vendedor,nombre,descripcion,precio,stock,categoria,imagen_url,estado})
                .eq('id_producto',id)
                .select('*')
                

                
            if (error){
                throw error
            }
            
            if (data.length === 0 ){
                return res.status(404).json({msg:'producto no encontrado'})
            }
            
            

            

            res.status(200).json({
                msg:'producto actualizado correctamente',
                producto:data
            })
            



        }catch(error){

            res.status(500).json({
                msg:'error al actualizar el producto',
                error:error.message
            })

        }
    }

    async eliminarProducto(req,res){

        try{

            const {id} = req.params

            const {error} = await supabase
                .from('productos')
                .delete()
                .eq('id_producto',id)
            
            if (error) throw error

            res.status(201).json({
                msg:`se elimino el usuario ${id}`
            })


        }catch(error){

            res.status(500).json({
                msg:'error al eliminar producto',
                error:error.message
            })

        }
    }
}

module.exports = new ProductosControllers()