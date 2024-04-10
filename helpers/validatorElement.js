const validator = require("validator");


/* funcion de validacion de datos */

const validatorArticles = (paramsData) =>{
    const validate_title = !validator.isEmpty(paramsData.title);
    const validate_content = !validator.isEmpty(paramsData.content);

    if(!validate_title || !validate_content){
        throw new Error("no se ha validado la informacion");
    };
}


module.exports = {
    validatorArticles
}