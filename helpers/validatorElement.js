const validator = require("validator");


/* funcion de validacion de datos */

const validatorArticles = (paramsData) =>{
    const validate_title = !validator.isEmpty(paramsData.title);
    const validate_content = !validator.isEmpty(paramsData.content);
    const validate_creator = !validator.isEmpty(paramsData.creator);
    const validate_country = !validator.isEmpty(paramsData.country);
    const validate_category = !validator.isEmpty(paramsData.category);

    if(!validate_title || !validate_content || !validate_creator || !validate_country || !validate_category){
        throw new Error("no se ha validado la informacion");
    };
}


module.exports = {
    validatorArticles
}