const express = require('express');
const app = express();

app.use(express.json());
port = 3000;

const rutausuario = require('./rutas/usuarios');
const rutaproducto = require('./rutas/productos');
const rutapedidos = require ('./rutas/pedidos')
app.use('/api/usuarios', rutausuario);
app.use('/api/productos', rutaproducto);
app.use('/api/pedidos', rutapedidos);

app.listen(port, () => {
    console.log('Servidor corriendo por el puerto '+ port);
});
