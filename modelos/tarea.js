const mongoose = require ('mongoose');

const tarea = new mongoose.Schema({
    titulo: {type:String, required:true},
    estado: {type:String, required:true},
    descripcion: {type:String, required:true}
});

module.exports = mongoose.model('Tarea', tarea);