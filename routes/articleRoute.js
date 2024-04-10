const {Router} = require("express") /* importamos el metodo router */

const upload = require ("../helpers/multer") /* helper Multer */

const articleRouter = Router() /* inicializamos la funcion */

const articleController = require("../controller/articleController")


/* Rutas */

/* get elements */
articleRouter.get("/articles/:limit?", articleController.initArticles) /* get de articulos poniendo un limite de cantidades */

articleRouter.get("/article/:pid", articleController.findOneArticle) /* get de articulo por id */

articleRouter.get("/img/:filedata", articleController.getImg) /* get de imagen */

articleRouter.get("/search/:searchdata", articleController.searchFun) /* get de busqueda */


/* post create element */
articleRouter.post("/articles/crear", articleController.create)
articleRouter.post("/subir-img/:pid", upload.single("file0"), articleController.uploadImg) /* post de imagen */



/* put element */
articleRouter.put("/article/:pid", articleController.putArticle)

/* delete Element */
articleRouter.delete("/article/:pid", articleController.deleteArticle)



module.exports = articleRouter;
