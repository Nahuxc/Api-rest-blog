const fs = require("fs")
const path = require("path")
const { validatorArticles } = require("../helpers/validatorElement")
const Article = require("../models/Article");




/* obtener todos los articulos */
const initArticles = (req, res) => {

        let getdataArticle = Article.find({});

        let { limit } = req.params;

        if (limit) {
            getdataArticle.limit(Number(limit))
        };

        getdataArticle.sort({ date: -1 })
            .then((article) => { /* obtenemos todos los datos de la db */
                return res.status(200).send({
                    status: "success",
                    parametro_url_limite: limit,
                    article
                });
            }).catch((err) => {
                return res.status(400).json({
                    status: "error",
                    mensaje: "faltan datos",
                    error: err
                });
            });

};



/* buscar el articulo por id */
const findOneArticle = (req, res) => {
    let { pid } = req.params

    Article.findById(pid).then((articleId) => {
        return res.status(200).send({
            status: "success",
            articleId
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "error",
            mensaje: "no se ha encontrado el id del articulo",
            error: err
        });
    });
};






/* crear una articulo methodo post */
const create = (req, res) => {

    // recogemos los parametros por el post

    const paramsData = req.body;


    //validamos los datos

    try {
        validatorArticles(paramsData)
    } catch (err) {
        return res.status(400).json({
            status: "error",
            mensaje: "faltan datos"
        });
    };

    //creamos el objeto

    const article = new Article(paramsData); //asignar valores (automatico)

    //guardar el articulo en la base de datos
    article.save().then((article) => {
        return res.status(200).json({
            status: "success",
            article: article,
            mensaje: "articulo creado"
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha Guardado el Articulo",
            error: err
        });
    });



};






/* actualizar/editar un articulo */
const putArticle = (req, res) => {
    /* obtener el id */
    let { pid } = req.params;

    /* obtener los nuevos datos ingresados a actualizar */
    let newDataArticle = req.body;

    /* validacion de datos */

    try {
        validatorArticles(newDataArticle)
    } catch (err) {
        return res.status(400).json({
            status: "error",
            mensaje: "faltan datos"
        });
    };


    /* buscamos y actualizamos el articulo */
    Article.findOneAndUpdate({ _id: pid }, newDataArticle, { new: true }).then((articleUpdate) => {
        return res.status(200).json({
            status: "success",
            article: articleUpdate,
            mensaje: "articulo Actualizado"
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "error",
            mensaje: "no se ha podido actualizar el articulo"
        });
    })

};





/* eliminar un articulo */
const deleteArticle = (req, res) => {

    /* obtener el id */
    let { pid } = req.params;

    /* buscamos en la base de datos el id que coincida y lo eliminamos*/
    Article.findOneAndDelete({ _id: pid }).then((articleDelete) => {
        return res.status(200).json({
            status: "success",
            article: articleDelete,
            mensaje: "Articulo Borrado"
        });
    }).catch((err) => {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido borrar el articulo, no se ha encontrado",
            error: err
        });
    });

};







/* subir imagenes */

const uploadImg = (req, res) => {

    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            mensaje: "peticion invalida"
        })
    }

    /* nombre del archivo */

    let nameFile = req.file.originalname

    /* extension del archivo */

    let nameFile_split = nameFile.split("\.")

    let extensionFile = nameFile_split[1];

    /* comprobar la extension correcta */

    if (extensionFile != "png" && extensionFile != "jpg" && extensionFile != "jpeg" && extensionFile != "gif") {
        fs.unlink(req.file.path, (err) => {
            return res.status(400).json({
                status: "error",
                mensaje: "imagen invalida"
            })
        })
    } else {

        let {pid} = req.params;

        /* buscamos y actualizamos el articulo */
        Article.findOneAndUpdate({ _id: pid }, {img: req.file.filename}, { new: true }).then((articleUpdate) => {
            return res.status(200).json({
                status: "success",
                article: articleUpdate,
                fileData: req.file,
                mensaje: "articulo Actualizado"
            });
        }).catch((err) => {
            return res.status(500).json({
                status: "error",
                mensaje: "no se ha podido actualizar el articulo"
            });
        })

    }


}








/* obtener imagen en formato*/
const getImg = (req, res) =>{
    let filedata  = req.params.filedata
    let route_file = "./img/articles/" + filedata

    fs.stat(route_file, (error, exist)=>{
        if(exist){
            console.log(exist);
            return res.sendFile(path.resolve(route_file))
        }else{
            return res.status(404).json({
                status:"error",
                mensaje: "la imagen no existe",
                existsw: exist,
                filedata
            })
        }
    })
}



/* buscador de articulos */
const searchFun = (req, res) =>{
    
    /* sacar el string de busqueda */
    let {searchdata} = req.params

    /* find  */
    Article.find({ "$or": [
        {"title": {"$regex": searchdata, "$options": "i"}},
        {"content": {"$regex": searchdata, "$options": "i"}}
    ]})
    .sort({date: -1})
    .then((articleSearch)=>{
        return res.status(200).json({
            status: "success",
            article: articleSearch
        })
    }).catch((err)=>{
        return res.status(404).json({
            status:"error",
            mensaje: "No se han encontrado articulos"
        })
    })
}





module.exports = {
    initArticles,
    findOneArticle,
    create,
    putArticle,
    uploadImg,
    getImg,
    searchFun,
    deleteArticle
}