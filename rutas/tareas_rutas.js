const tareas_operaciones = require('../servicios/tareas_operaciones');
const router = require('express').Router();

router.get('/', tareas_operaciones.listar_tareas)
router.get('/:id', tareas_operaciones.obtener_tarea)
router.post('/', tareas_operaciones.guardar_nueva_tarea)
router.put('/:id', tareas_operaciones.actualizar_tarea)
router.delete('/:id', tareas_operaciones.borrar_tarea)

module.exports = router