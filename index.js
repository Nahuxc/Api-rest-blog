const { connection } = require("./database/connection"); /* importamos el script de conexion */

const express = require("express");

const cors = require("cors");

/* importacion de Routes */
const router_articles = require("./routes/articleRoute")


connection(); /* conexion a la db */


/* creamos el servidor */
const app = express();
const PORT = 3000;

/* middlewares */

app.use(cors()); /* configurar cors */

app.use(express.json()); /* convertir Body a Objeto JSON */
app.use(express.urlencoded({extended: true})) // podemos recibir datos en forma de formulario


/* inicio de mi servidor */
app.get("/", (req, res)=>{
    res.status(200).send("Este es tu inicio")
});

/* routes */
app.use("/api", router_articles)


/* Inicializamos el servidor y Escuchamos las peticiones http */
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el port: http://localhost:${PORT}/`);
});



