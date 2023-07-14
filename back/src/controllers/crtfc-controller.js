import { crtfcAuthService } from "../services/crtfcService";

const postCrtfc = async (req,res,next) => {
    try{
        const author = req.currentUserId;
        const {title,licence,issuedDate,issuer,langscore} = req.body;

        const newCrtfc = await crtfcAuthService.addCrtfc(
            title,
            licence,
            issuedDate,
            issuer,
            langscore,
            author
        );
        res.status(201).json(newCrtfc);
    }catch(error){
        next(error);
    }
}

const userGetCrtfc = async (req,res,next) =>{
    try{

        const crtfc = await crtfcAuthService.getCrtfc(req.currentUserId);

        res.status(200).send(crtfc);
    }catch(error){
        next(error);
    }
}


const getCrtfc = async (req,res,next) =>{
    try{
        const crtfcId = await crtfcAuthService.getCrtfc(req.params.id);
        res.status(200).send(crtfcId);
    }catch(error){
        next(error);
    }
}
/**
 * TODO : if문 6개 날리기
 * 
 * Joi에서는 key를 optional로 주고, 
 * 프론트엔드에 요청할게 있음 - 업데이트 하지 않을땐 body에 key를 추가하지 말것
 * 
 * 1. 전개연산자
 * 2. Object.entries()
 */

const putCrtfc = async (req,res,next)=>{
    try{
        const crtfcId = req.params.id;

        const updatedCrtfc = await crtfcAuthService.setCrtfc(crtfcId,{toUpdate: {...req.body}});

        res.status(201).send(updatedCrtfc);
    
    }catch(error){
    next(error);
    }
}

const deleteCrtfc = async (req,res,next)=>{
    try{
        const deleteCrtfc = await crtfcAuthService.deleteCrtfc(req.params.id);
        res.status(200).send(deleteCrtfc);
    }catch(error){
        next(error);
    }
}

export { postCrtfc, userGetCrtfc, getCrtfc, putCrtfc, deleteCrtfc};