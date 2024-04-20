require("dotenv").config()

const mongoose = require("mongoose")
/* rutas y usuarios de la db */

/* url Conexion */
const URLMONGO = process.env.URLMONGO


const connection = async ()=>{
    try {
        await mongoose.connect(URLMONGO)

        /*  AVISO:
            solo usar en caso de errores de conexion
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useCreateIndex: true */
        console.log(`conectado correctamente a la base de datos`);

    } catch (err) {
        console.log(err);
        throw new Error("No te Has Podido Conectar A la Base De datos")
    }
}


module.exports = {
    connection
}