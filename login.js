const bcrypt = require('bcrypt');
const connection = require("./conexion");
const saltRounds = 10;

const login = async (req, res) => { // req= request, peticion; res= response, respuesta
    const datos = req.query; 
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
        "SELECT * FROM `usuarios` WHERE `usuario` = ?",
        [datos.usuario]
        );
        console.log(bcrypt.hashSync(datos.password, saltRounds));
        if(results.length>0 && bcrypt.compareSync(datos.password, results[0].password)){
            req.session.usuario = datos.usuario;
            res.status(200).send('inicio sesion correctamente')
        } else{
            res.status(401).send('Datos ingresados incorrectos')
        
        }
    
    } catch (err) {
        console.log(err);
        res.status(500).send('Error en el servidor')
    }
  
}

module.exports = login;