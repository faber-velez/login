const express = require('express')
const app = express()
const port = 3000

// Get the client

const cors = require('cors')
const session = require('express-session')

const md5 = require('md5');
const bcrypt = require('bcrypt');
const login = require('./login');
const registro = require('./registro');
const { obtenerUsuario, eliminarUsuario } = require('./usuarios');
const validacion = require('./validacion');
const saltRounds = 10;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}))
app.use(session({
  secret:'uY8nV5!kL3#r$TzP@x2w'
}))

app.get('/login', login)

app.get('/validacion', validacion)  

app.get('/registro', registro)

app.get('/usuarios', obtenerUsuario)

app.delete('/usuarios', eliminarUsuario)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})