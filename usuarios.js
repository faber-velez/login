const connection = require("./conexion");

 const obtenerUsuario = async (req, res) => { // req= request, peticion; res= response, respuesta
    if(!req.session.usuario){
        res.status(401).send('No autorizado')
        return
    }
    // A simple SELECT query
    try {
    const [results, fields] = await connection.query(
        "SELECT * FROM `usuarios`",
    );

    res.status(200).json(results)

    } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
    }
}

const eliminarUsuario = async (req, res) => { // req= request, peticion; res= response, respuesta
        if(!req.session.usuario){
        res.status(401).send('No autorizado')
        return
        }
        const datos= req.query;
        // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
        "DELETE FROM `usuarios` WHERE `usuarios`.`ID` = ?",[datos.ID
        ]
        );
    
        if(results.affectedRows>0){
        res.status(200).send('Usuario eliminado')
    } else{
        res.status(401).send('Usuario no eliminado')
    }
    
    } catch (err) {
        console.log(err);
        res.status(500).send('Error en el servidor')
    }
  }

  module.exports = {obtenerUsuario, eliminarUsuario}