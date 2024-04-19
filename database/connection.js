require("dotenv").config()

const mongoose = require("mongoose")
/* rutas y usuarios de la db */

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD

const db = "blogPr"

/* url db */
const url = `mongodb+srv://${USER}:${PASSWORD}@blog.vq5sxjw.mongodb.net/${db}`

const connection = async ()=>{
    try {
        await mongoose.connect(url)

        /*  AVISO:
            solo usar en caso de errores de conexion
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true */
        console.log(`conectado correctamente a la base de datos: ${db}`);

    } catch (err) {
        console.log(err);
        throw new Error("No te Has Podido Conectar A la Base De datos")
    }
}


module.exports = {
    connection
}