const express = require('express')

const app = express()

// JSON Middleware
app.use(express.json());

const port = process.env.PORT || 3000

// Import products routes
const usuariosRouter = require('./routes/usuariosRoutes')
const notasRouter = require('./routes/notasRoutes')

// Route middleware
app.use("/api/v1/usuarios", usuariosRouter);
app.use("/api/v1/notas", notasRouter);

// http://localhost:3000/
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
    <p> Puedes ejecutar las siguientes acciones desde este navegador: </p>
    <ul>
        <li> GET </li>
        <ul>
            <li> <a href="/ping"> ping_pong </a> </li>
            <li> <a href="/no_existe"> force_404 </a> </li>
            <br>
            <li> <a href="/api/v1/usuarios"> get_all_users </a> </li>
            <li> <a href="/api/v1/usuarios/1"> get_user_by_id=1 </a> </li>
            <br>
            <li> <a href="/api/v1/notas"> get_all_posts </a> </li>
            <li> <a href="/api/v1/notas/2"> get_post_by_id=2 </a> </li>
            <li> <a href="/api/v1/notas/del_usuario/1"> get_post_by_user_id=1 </a> </li>
            <li> <a href="/api/v1/notas/del_usuario/2"> get_post_by_user_id=2 </a> </li>
        </ul>
    </ul>
    
    <hr>

    <p> Los siguientes (y tambien los anteriores) pueden ser ejecutados desde POSTMAN: <br>
    ("postman_collection" y "postman_environment" disponibles en la carpeta raíz del proyecto)</p>
    <ul>
        <li> POST </li>
        <ul>
            <li> create_user </li>
            <li> create_notes </li>
        </ul>
        <br>

        <li> PATCH </li>
        <ul>
            <li> update_user </li>
            <li> update_notes </li>
        </ul>
        <br>

        <li> DELETE </li>
        <ul>
            <li> delete_user </li>
            <li> delete_notes </li>
        </ul>
    </ul>

    <hr>
    <p> rc95, Asunción - Paraguay </p>
    `
    res.send(mensaje)
})

// http://localhost:3000/ping
app.get('/ping', async (req, res) => {
    res.send('pong')
})

app.get('/*', (req, res) => {
    res.send('Error 404: pagina no encontrada..')
})


const mi_bd = require('./db/db')
const main = async () => {
    const db = await mi_bd.obtener_bd()

    await mi_bd.crear_y_poblar_tabla_usuarios(db)
    await mi_bd.crear_y_poblar_tabla_notas(db)
}


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/`)

    main()
})