//Importación
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('./conexion');
const env = process.env;

//Configuración
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.set('port', env.PORT || 8080);

//Arranque
app.listen(app.get('port'), () => {
    console.log("Servidor " + env.npm_package_name + " iniciado en puerto "+ app.get('port'));
});

//Rutas base
app.get('/', (req, res) => {
	res.send("API iniciado");
});
app.use('/api/tareas', require('./rutas/tareas_rutas'));