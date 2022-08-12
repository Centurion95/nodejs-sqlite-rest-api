//controller
const theController = require('../controllers/notasController.js')

const { Router } = require('express')
const thisRouter = Router()

// http://localhost:3000/api/v1/notas
thisRouter.get('/', theController.obtener_todos)

// http://localhost:3000/api/v1/notas/1
thisRouter.get('/:id', theController.obtener_por_id)

// http://localhost:3000/api/v1/notas/del_usuario/1
thisRouter.get('/del_usuario/:id', theController.obtener_por_id_usuario)

// POST - http://localhost:3000/api/v1/notas/
thisRouter.post('/', theController.insertar_uno)

// PATCH - http://localhost:3000/api/v1/notas
thisRouter.patch('/:id', theController.modificar_por_id)

// DELETE - http://localhost:3000/api/v1/notas
thisRouter.delete('/:id', theController.eliminar_por_id)

module.exports = thisRouter 