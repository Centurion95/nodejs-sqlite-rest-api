const fetch = require('node-fetch')
const express = require('express')

const app = express()
const port = process.env.PORT

// const router1 = require('./routers/router1')
// app.use(userRouter)

app.get('/', async (req, res) => {
    const mensaje = `
    <style>
    * {
        color: white;
        background: hsl(0, 0%, 18.82%);
    }
    </style>

    <p> Hola!, </p>
    <hr>
    <p> Puedes probar las siguientes acciones: </p>
    <ul>
        <li> <a href="/ping"> ping_pong </a> </li>
        <li> <a href="/users"> get_all_users </a> </li>
        <li> <a href="/users/1"> get_user_by_id=1 </a> </li>
        <li> <a href="/users_dummy"> create_user_dummy </a> </li>
        <li> <a href="/posts"> get_all_posts </a> </li>
        <li> <a href="/posts/2"> get_post_by_id=2 </a> </li>
        <li> <a href="/posts_from_user/3"> get_post_by_user_id=3 </a> </li>
        <li> <a href="/no_existe"> force_404 </a> </li>
    </ul>
    <hr>
    <p> rc95, Asunción - Paraguay </p>
    `
    res.send(mensaje)
})

app.get('/ping', async (req, res) => {
    res.send('pong')
})

app.get('/users', async (req, res) => {
    try {
        // const response = await fetch(process.env.RUTA_USERS);
        // const data = await response.json();
        // res.send(data)

        const registros = await obtener_todos_los_usuarios()
        res.send(registros)
    } catch (error) {
        res.send('error' + error)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        // const response = await fetch(`${process.env.RUTA_USERS}/${id}`);
        // const data = await response.json();
        // res.send(data)

        const registro = await obtener_usuario_por_id(id)
        res.send(registro)
    } catch (error) {
        res.send('error' + error)
    }
})

app.get('/posts', async (req, res) => {
    try {
        // const response = await fetch(process.env.RUTA_POSTS);
        // const data = await response.json();
        // res.send(data)

        const registros = await obtener_todas_las_notas()
        res.send(registros)
    } catch (error) {
        res.send('error' + error)
    }
})

app.get('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id
        // const response = await fetch(`${process.env.RUTA_POSTS}/${id}`);
        // const data = await response.json();
        // res.send(data)

        const registro = await obtener_nota_por_id(id)
        res.send(registro)
    } catch (error) {
        res.send('error' + error)
    }
})

app.get('/posts_from_user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await fetch(`${process.env.RUTA_POSTS}?userId=${id}`);
        const data = await response.json();
        res.send(data)
    } catch (error) {
        res.send('error' + error)
    }
})


app.post('/posts_dummy', async (req, res) => {
    console.log('/posts_dummy')
    try {
        const body = {
            title: 'titulo',
            body: 'cuerpo',
            userId: 1,
        }
        const response = await fetch(process.env.RUTA_POSTS, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        });
        const data = await response.json();
    } catch (error) {
        res.send('error' + error)
    }
})


app.get('/*', (req, res) => {
    res.send('Error 404: pagina no encontrada..')
})


const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite') //para usar async/await

let db
const obtener_bd = async () => {
    db = await open({
        filename: 'my_sqlite.db',
        driver: sqlite3.Database
    })
}

const crear_y_poblar_tabla_usuarios = () => {
    return new Promise(async (resolve, reject) => {
        // console.error(`step 1..`)
        try {
            await db.run(`CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nombre TEXT NOT NULL,
                email TEXT,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP )`)

            const mi_consulta = await db.get(`select count(id) as cantidad from usuarios`)
            if (mi_consulta.cantidad == 0) {
                await db.run(`INSERT INTO usuarios(
                    nombre,
                    email
                ) VALUES (
                    'Roberto',
                    'robert@hotmail.com'
                ), (
                    'Maria',
                    'ma_ria@gmail.com'
                )`)
            }

            resolve()
        } catch (error) {
            console.error(`ERROR in step 1: ${error}`)
            reject()
        }
    })
}

const imprimir_tabla_usuarios = () => {
    return new Promise(async (resolve, reject) => {
        // console.error(`step 2.. usuarios..`)
        try {
            await db.each("SELECT * FROM usuarios", (err, row) => {
                if (err) {
                    reject()
                    throw err
                }
                console.log(row)
            })

            resolve()
        } catch (error) {
            console.error(`ERROR in step 2: ${error}`)
            reject()
        }
    })
}

const crear_y_poblar_tabla_notas = () => {
    return new Promise(async (resolve, reject) => {
        // console.error(`step 3..`)
        try {
            await db.run(`CREATE TABLE IF NOT EXISTS notas (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                id_usuario INTEGER, 
                titulo TEXT NOT NULL,
                cuerpo TEXT,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP )`)

            const mi_consulta = await db.get(`select count(id) as cantidad from notas`)
            if (mi_consulta.cantidad == 0) {
                await db.run(`INSERT INTO notas(
                id_usuario,
                titulo,
                cuerpo
                ) VALUES (
                    1,
                    'nota 1 roberto',
                    'lorem ipsum dolorem 111111 robertoooo'
                ),(
                    1,
                    'nota 2 roberto',
                    'lorem ipsum dolorem 222222 robertoooo'
                ),(
                    2,
                    'nota 1 maria',
                    'lorem ipsum dolorem 1 mariaaaa'
                )`)
            }

            resolve()
        } catch (error) {
            console.error(`ERROR in step 3: ${error}`)
            reject()
        }
    })
}

const imprimir_tabla_notas = () => {
    return new Promise(async (resolve, reject) => {
        // console.error(`step 4.. notas..`)
        try {
            await db.each("SELECT * FROM notas", (err, row) => {
                if (err) {
                    reject()
                    throw err
                }
                console.log(row)
            })

            resolve()
        } catch (error) {
            console.error(`ERROR in step 4: ${error}`)
            reject()
        }
    })
}






const obtener_todos_los_usuarios = () => {
    return new Promise(async (resolve, reject) => {
        console.error(`obtener_todos_los_usuarios:`)
        try {
            const registros = await db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
                if (err) {
                    reject()
                    throw err
                }
                // console.log(rows)
                return rows
            })

            resolve(registros)
        } catch (error) {
            console.error(`ERROR in step 2: ${error}`)
            reject()
        }
    })
}

const obtener_usuario_por_id = (id) => {
    return new Promise(async (resolve, reject) => {
        console.error(`obtener_usuario_por_id: ${id}`)
        try {
            const registro = await db.get(`SELECT * FROM usuarios where ID =?`, [id], (err, row) => {
                if (err) {
                    reject()
                    throw err
                }
                // console.log(row)
                return row
            })

            resolve(registro)
        } catch (error) {
            console.error(`ERROR in step 2: ${error}`)
            reject()
        }
    })
}




const obtener_todas_las_notas = () => {
    return new Promise(async (resolve, reject) => {
        console.error(`obtener_todas_las_notas:`)
        try {
            const registros = await db.all(`SELECT * FROM notas`, [], (err, rows) => {
                if (err) {
                    reject()
                    throw err
                }
                // console.log(rows)
                return rows
            })

            resolve(registros)
        } catch (error) {
            console.error(`ERROR in step 2: ${error}`)
            reject()
        }
    })
}

const obtener_nota_por_id = (id) => {
    return new Promise(async (resolve, reject) => {
        console.error(`obtener_nota_por_id: ${id}`)
        try {
            const registro = await db.get(`SELECT * FROM notas where ID =?`, [id], (err, row) => {
                if (err) {
                    reject()
                    throw err
                }
                // console.log(row)
                return row
            })

            resolve(registro)
        } catch (error) {
            console.error(`ERROR in step 2: ${error}`)
            reject()
        }
    })
}




const main = async () => {
    await obtener_bd()

    await crear_y_poblar_tabla_usuarios()
    // await imprimir_tabla_usuarios(db)

    await crear_y_poblar_tabla_notas()
    // await imprimir_tabla_notas(db)
}


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/`)

    main()
})