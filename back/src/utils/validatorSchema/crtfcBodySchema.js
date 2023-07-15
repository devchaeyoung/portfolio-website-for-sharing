import joi from "joi";


class crtfcBodySchema {
    static postCrtfcSchema () {
        return joi.object({
            title : joi.string().min(1).max(20).required(),
            licence : joi.number().required(),
            issuedDate : joi.string().min(1).max(20).required(),
            issuer : joi.string().min(1).max(20).required(),
            langscore : joi.number().required(),
        });
    }
    
    
    
    static putCrtfcSchema (){
        return joi.object({
            title : joi.string().min(1).max(20).optional(),
            licence : joi.number().optional(),
            issuedDate : joi.string().min(1).max(20).optional(),
            issuer : joi.string().min(1).max(20).optional(),
            langscore : joi.number().optional(),
        });
    }
    
}

export {crtfcBodySchema};