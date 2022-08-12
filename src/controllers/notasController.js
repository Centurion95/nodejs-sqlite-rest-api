const { obtener_bd } = require('../db/db')

const nombre_tabla = 'notas'

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
                return res.status(200).status(404).send() //not found
            }
            return res.send(resultado)
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
    obtener_por_id_usuario: async (req, res) => {
        const db = await obtener_bd()
        console.log(`obtener_por_id_usuario:`)
        try {
            const id = req.params.id
            const resultado = await db.all(`SELECT * FROM ${nombre_tabla} where id_usuario = ?`, [id], (err, rows) => {
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
            console.error(`ERROR in obtener_por_id_usuario: ${error}`)
            return res.status(500).send(error) //server error
        }
    },
}

module.exports = thisController 