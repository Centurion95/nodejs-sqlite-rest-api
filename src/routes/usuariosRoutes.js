//controller
const theController = require('../controllers/usuariosController.js')

const { Router } = require('express')
const thisRouter = Router()

// GET - http://localhost:3000/api/v1/usuarios
thisRouter.get('/', theController.obtener_todos)

// GET - http://localhost:3000/api/v1/usuarios/1
thisRouter.get('/:id', theController.obtener_por_id)

// POST - http://localhost:3000/api/v1/usuarios
thisRouter.post('/', theController.insertar_uno)

// PATCH - http://localhost:3000/api/v1/usuarios/1
thisRouter.patch('/:id', theController.modificar_por_id)

// DELETE - http://localhost:3000/api/v1/usuarios/2
thisRouter.delete('/:id', theController.eliminar_por_id)

module.exports = thisRouter  