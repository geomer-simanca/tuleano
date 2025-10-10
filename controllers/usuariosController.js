const supabase = require('../database/conexion.js')

class UsuariosController{
    constructor() {}

    // consultar a todos los usuarios de la base de datos
    async consultar(req,res) {
        // res.send({msg:'Consulta usuarios',supabase})
        try{
            const { data, error } = await supabase.from('usuarios').select('id_usuario,nombre,email')
            if(error){
                throw error
            }

            res.json({
                msg: 'Consulta de usuarios exitosa',
                usuarios: data,
            })

        }catch (err){
            res.status(500).json({
                msg: 'Error al consultar usuarios',
                error: err.message,
            })
        }
    }

    // consultar detalles de un solo usuario no de todos los usuarios
    async consultarDetalle(req,res){

        try{
            const {id} = req.params

            // aclaramos que debe de haber un id si se busaca usuarios/ 

            if (!id){
                return res.status(400).json({
                    msg:'si colocar / debes de colocar un id de un usuario'
                })
            }

            const {data,error} = await supabase
                .from('usuarios')
                .select('id_usuario,nombre,email')
                .eq('id_usuario',id)
                .single()

            if (error){
                if (error.message.includes('No rows')){
                    return res.status(404).json({
                        msg:`no se encontro ningun usuario con id ${id}`
                    })
                }

                throw error
            }

            res.status(200).json({
                msg:`usuario con id: ${id} encontrado`,
                usuario: data
            })

        }catch (err){

            res.status(500).json({
                msg:`error al consultar al usuario con id: ${req.params.id}`,
                error:err.message
            })

        }
        
        
        


    }

    // ingrsar datos a la base de datos de usuarios
    async ingresar(req,res){
        try{

            const {nombre , email , clave , telefono , direccion , es_vendedor} = req.body


            // validamos que esten todos los datos

            if (!nombre || !email || !clave || !telefono || !direccion || es_vendedor === undefined){
                return res.status(400).json({msg:'la peticio debe tener nombre , email , clave , telefono , direccion , es_vendedor '})
            }

            const {data,error} = await supabase
                .from('usuarios')
                .insert([
                    {nombre , email , clave , telefono , direccion , es_vendedor}
                ])
                .select('*')
                .single()
            

            if (error){
                throw error
            }

            res.status(201).json({
                msg:'usuario creado exitosamente',
                usuario: data
            })

        }catch (err){

            res.status(500).json({
                msg:'error al crear el usuario',
                error: err.message
            })
            
        }

    }

    async actualizar(req,res){

        try{

            const {id} = req.params
            const {nombre , email , clave , telefono , direccion , es_vendedor} = req.body


            if (!id){
                return res.status(400).json({
                    msg:'Falta el ID del usuario a actualizar'
                })
            }

            if (!nombre || !email || !clave || !telefono || !direccion || es_vendedor === undefined){
                return res.status(400).json({msg:'la peticion debe tener nombre , email , clave , telefono , direccion , es_vendedor '})
            }

            const {data,error} = await supabase
                .from('usuarios')
                .update({nombre , email , clave , telefono , direccion , es_vendedor})
                .eq('id_usuario',id)
                .select()
            
            if (error) throw error

            if (data.length === 0 ){
                return res.status(404).json({msg:'usuario no encontrado'})
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

    borrar(req,res){
        res.send({msg:'Eliminacion de usuario'})

    }


}


module.exports = new UsuariosController();