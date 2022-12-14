const { obtener_bd } = require('../db/db')

const nombre_tabla = 'usuarios'

const thisController = {
    obtener_todos: async (req, res) => {
        const db = await obtener_bd()
        console.log(`obtener_todos:`)
        try {
            const resultado = await db.all(`SELECT * FROM ${nombre_tabla}`, [], (err, rows) => {
                if (err) {
                    return res.status(500).send(error) //server error
                }
                return rows
            })
            if (resultado.length == 0) {
                return res.status(404).send() //not found
            }
            return res.status(200).send(resultado)
        } catch (error) {
            console.error(`ERROR in obtener_todos: ${error}`)
            return res.status(500).send(error) //server error
        }
    },
    obtener_por_id: async (req, res) => {
        const db = await obtener_bd()
        console.log(`obtener_por_id:`)
        try {
            const id = req.params.id
            const resultado = await db.all(`SELECT * FROM ${nombre_tabla} where id = ?`, [id], (err, rows) => {
                if (err) {
                    return res.status(500).send(error) //server error
                }
                return rows
            })
            if (resultado.length == 0) {
                return res.status(404).send() //not found
            }
            return res.status(200).send(resultado)
        } catch (error) {
            console.error(`ERROR in obtener_por_id: ${error}`)
            return res.status(500).send(error) //server error
        }
    },
    insertar_uno: async (req, res) => {
        if (!req.body.nombre || !req.body.email) {
            return res.status(400).send('Faltan parametros obligatorios!')
        }

        const db = await obtener_bd()
        console.log(`insertar_uno:`)
        try {
            const nombre = req.body.nombre
            const email = req.body.email

            const resultado = await db.run(`insert into ${nombre_tabla}(nombre, email) values(?, ?)`, [nombre, email], (err, row) => {
                if (err) {
                    return res.status(500).send(error) //server error
                } else {
                    return this
                }
            })
            if (!resultado) {
                return res.status(500).send() //server error
            }
            return res.status(201).send(resultado)
        } catch (error) {
            console.error(`ERROR in insertar_uno: ${error}`)
            return res.status(500).send(error) //server error
        }
    },
    modificar_por_id: async (req, res) => {
        const db = await obtener_bd()
        console.log(`modificar_por_id:`)
        try {
            const id = req.params.id
            const registro_existente = await db.all(`SELECT * FROM ${nombre_tabla} where id = ?`, [id], (err, row) => {
                if (err) {
                    return res.status(500).send(error) //server error
                }
                return row
            })
            if (registro_existente.length == 0) {
                return res.status(404).send('No existe el registro a actualizar!') //not found
            }

            const nombre = req.body.nombre
            const email = req.body.email

            const resultado = await db.run(`update ${nombre_tabla} set nombre = ?, email = ? where id = ?`, [nombre, email, id], (err, rows) => {
                if (err) {
                    return res.status(500).send(error) //server error
                } else {
                    return this
                }
            })
            if (!resultado) {
                return res.status(404).send() //not found
            }
            return res.status(200).send(resultado)
        } catch (error) {
            console.error(`ERROR in modificar_por_id: ${error}`)
            return res.status(500).send(error) //server error
        }
    },
    eliminar_por_id: async (req, res) => {
        const db = await obtener_bd()
        console.log(`eliminar_por_id:`)
        try {
            const id = req.params.id
            const registro_existente = await db.all(`SELECT * FROM ${nombre_tabla} where id = ?`, [id], (err, row) => {
                if (err) {
                    return res.status(500).send(error) //server error
                }
                return row
            })
            if (registro_existente.length == 0) {
                return res.status(404).send('No existe el registro a eliminar!') //not found
            }

            const resultado = await db.run(`delete from ${nombre_tabla} where id = ?`, [id], (err, rows) => {
                if (err) {
                    return res.status(500).send(error) //server error
                } else {
                    return this
                }
            })
            if (!resultado) {
                return res.status(404).send() //not found
            }
            return res.status(200).send(resultado)
        } catch (error) {
            console.error(`ERROR in eliminar_por_id: ${error}`)
            return res.status(500).send(error) //server error
        }
    },
}

module.exports = thisController 