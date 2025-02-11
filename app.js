const express = require('express')
const app = express()
const port = process.env.PORT || 3000

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
mysql://root:HdYeKAdRhjNLYlwDGtuSiLphGuqEIXei@monorail.proxy.rlwy.net:14677/railway
app.use(cors({
  origin: process.env.URLFROND || 'http://localhost:5173',
  credentials:true
}))
app.use(session({
  secret: process.env.SECRETSESSION || 'uY8nV5!kL3#r$TzP@x2w',
  proxy: process.env.NODE_ENV === 'production',
  cookie:{
    secure: process.env.NODE_ENV === 'prduction',
    sameSite: 'none'
  }
}))

app.get('/login', login)

app.get('/validacion', validacion)  

app.get('/registro', registro)

app.get('/usuarios', obtenerUsuario)

app.delete('/usuarios', eliminarUsuario)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})