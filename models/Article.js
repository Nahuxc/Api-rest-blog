const { Schema, model } = require("mongoose") /* importamos el schema para definir nuestro esquema, y model nos deja indicar el nombre de mi objeto */

const dbArticles = "articles" /* conexion articulos */

/* Armamos Nuestra Estructura de objeto */
const ArticleSchema = Schema({
    title: {
        type: String,
        required:true
    },
    country: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    },
    creator:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    img: {
        type: String,
        default: "default.png"
    }
})


module.exports = model("Article", ArticleSchema, `${dbArticles}`)