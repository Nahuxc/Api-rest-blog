const mongoose = require("mongoose")

/* rutas y usuarios de la db */

/* usuario db */
/* const userG = "userG"
const passwordDbuserG = "7Jw08Pcph5gs5TSn" */

// admin
const userDb = "adminN"
const passwordDb = "3Q9G5EJTL4Opwidm"

const db = "blogPr"


/* url db */
const url = `mongodb+srv://${userDb}:${passwordDb}@blog.vq5sxjw.mongodb.net/${db}`

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