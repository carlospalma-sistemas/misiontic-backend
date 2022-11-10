const tareas_operaciones = {};
const tareas_repo = require('../modelos/tarea');
const maxtime = 30000;

tareas_operaciones.listar_tareas = async function(req, res) {
    try {
        const filter = req.query;

        if (filter.q == null) {
            const tareas = await tareas_repo.find(filter);
		    res.status(200).json(tareas);
        } 
        else {
            const tareas = await tareas_repo.find({
                "$or" : [ 
                    {"titulo": {$regex:filter.q, $options:"i"}},
                    {"descripcion": {$regex:filter.q, $options:"i"}},
                    {"estado": {$regex:filter.q, $options:"i"}}
                ]
            });

            /*const tareas = await tareas_repo.find(
                { $text: { $search: filter } }
            );*/

		    res.status(200).json(tareas);
        }
    }
    catch(err) {
        res.status(400).json({message:"Mala solicitud al buscar datos. "+err.message});
    }
}

tareas_operaciones.obtener_tarea = async function(req, res) {
    try {
        const params = req.params;

		const tarea = await tareas_repo.findById(params.id);
        if (tarea == null) {
            res.status(404).json({message: "No encontrado"});
        }
        else {
            res.status(200).json(tarea);
        }
    }
    catch(err) {
        res.status(400).json({message:"Mala solicitud al buscar dato. "+err.message});
    }
}

tareas_operaciones.guardar_nueva_tarea = async function(req, res) {
    try {
        const body = req.body;

        const tarea = new tareas_repo(body);
		await tarea.save();
		res.status(201).json(tarea);
    }
    catch(err) {
        res.status(400).json({message:"Mala solicitud al crear datos. "+err.message});
    }
}

tareas_operaciones.actualizar_tarea = async function(req, res) {
    try {
		const params = req.params;
        const body = req.body;

		const tarea = {
			titulo: body.titulo,
			estado: body.estado,
            descripcion: body.descripcion
		}
		await tareas_repo.findByIdAndUpdate(params.id, {$set: tarea}, {new: true});
		res.status(200).json(tarea);
	}
	catch(err) {
		res.status(400).json({message: "Mala solicitud al modificar datos. "+err.message})
	}
}

tareas_operaciones.borrar_tarea = async function(req, res) {
    try {
        const params = req.params;

		const tarea = await tareas_repo.findByIdAndDelete(params.id);
        if (tarea == null) {
            res.status(404).json({message: "No encontrado"});
        }
        else {
            res.status(200).json(tarea);
        }
    }
    catch(err) {
        res.status(400).json({message:"Mala solicitud al borrar dato. "+err.message});
    }
}

module.exports = tareas_operaciones;