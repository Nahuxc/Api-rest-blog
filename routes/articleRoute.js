const {Router} = require("express") /* importamos el metodo router */

const upload = require ("../helpers/multer") /* helper Multer */

const articleRouter = Router() /* inicializamos la funcion */

const articleController = require("../controller/articleController")


/* Rutas */

/* get elements */
articleRouter.get("/articles/:limit?", articleController.initArticles)
articleRouter.get("/article/:pid", articleController.findOneArticle)

/* post create element */
articleRouter.post("/articles/crear", articleController.create)

articleRouter.post("/subir-img/:pid", upload.single("file0"), articleController.uploadImg)


/* put element */
articleRouter.put("/article/:pid", articleController.putArticle)

/* delete Element */
articleRouter.delete("/article/:pid", articleController.deleteArticle)



module.exports = articleRouter;
