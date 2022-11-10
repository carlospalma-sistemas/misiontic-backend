const mongoose = require('mongoose');
const database = "TareasMisionTIC";
const user = "admin";
const password = "admin";
const URI = 'mongodb+srv://'+user+':'+password+'@cluster0.pu6x2hd.mongodb.net/'+database+'?retryWrites=true&w=majority';

mongoose.connect(URI)
	.then(db => console.log("Atlas en linea"))
	.catch(err=> console.log("Error en la conexión a Atlas. "+err));

module.exports = mongoose;

