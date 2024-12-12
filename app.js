const express = require('express')
const app = express()
const port = 3000

// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')
const session = require('express-session')

app.use(cors({
  origin: 'http://localhost:5173/',
  credentials:true
}))
app.use(session({
  secret:'uY8nV5!kL3#r$TzP@x2w'
}))

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'inventify',
});

app.get('/login', async (req, res) => { // req= request, peticion; res= response, respuesta
    const datos = req.query; 
    // A simple SELECT query
try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `password` = ?",
      [datos.usuario, datos.password]
    );

    if(results.length>0){
        req.session.usuario = datos.usuario;
        res.status(200).send('inicio sesion correctamente')
    } else{
        res.status(401).send('Datos ingresados incorrectos')
    }
  
  } catch (err) {
    console.log(err);
  }
  
})

app.get('/validacion', (req, res) => {

  if(req.session.usuario){
    res.status(200).send('sesion validada')
  }else{
    res.status(401).send('No autorizado')
  }
})  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})