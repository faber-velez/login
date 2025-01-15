const bcrypt = require('bcrypt');
const connection = require("./conexion");
const saltRounds = 10;

const registro = async (req, res) => { // req= request, peticion; res= response, respuesta
    if(!req.session.usuario){
        res.status(401).send('No autorizado')
        return
    }
    const datos = req.query; 
    // A simple SELECT query
    try {
    const hash = bcrypt.hashSync(datos.password, saltRounds);

    const [results, fields] = await connection.query(
        "INSERT INTO `usuarios` (`ID`, `usuario`, `password`) VALUES (NULL, ?, ?);",
        [datos.usuario, hash]
    );

    if(results.affectedRows>0){
        req.session.usuario = datos.usuario;
        res.status(200).send('Registrado correctamente')
    } else{
        res.status(401).send('No se registro el usuario')
        
    }

    } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
    }
}

module.exports = registro;