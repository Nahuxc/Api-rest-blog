const multer = require("multer") /* importamos multer para poder subir archivos */

const storageImg = multer.diskStorage({
    destination: (req, file, cb) =>{ /* indicamos el archivo y con cb donde queremos guardarlo */
    cb(null, "./img/articles/")

    },

    filename: (req, file, cb) =>{
        cb(null, "article" + Date.now() + file.originalname)
    }
})


const upload = multer({storage: storageImg})


module.exports = upload;