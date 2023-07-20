import { crtfcAuthService } from "../services/crtfcService";
const { StatusCodes } = require('http-status-codes');
import { crtfcBodySchema } from "../utils/validatorSchema/crtfcBodySchema";
import { createValidator } from "express-joi-validation";
const { logger } = require('../utils/logging');
const validator = createValidator();

const sendResponse = function (res, statusCode, data) {
    if (statusCode >= 400) {
        logger.error(`Error occurred. Status Code: ${statusCode}`);
    }else{
        res.status(statusCode).json(data);
    }
    return;
  };
  
const postCrtfc = async (req,res) => {
    try{
        
        const author = req.currentUserId;
        const schema = crtfcBodySchema.postCrtfcSchema();
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, {});
        }

        const addMyCrtfc = await crtfcAuthService.addCrtfc({toCreate : {...req.body,author}});

        return sendResponse(res, StatusCodes.OK, addMyCrtfc);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, StatusCodes.NOT_FOUND, {});
    }
}

const getMyCrtfc = async (req,res) =>{
    try{

        const myCrtfc = await crtfcAuthService.getCrtfc(req.currentUserId);

        return sendResponse(res, StatusCodes.OK, myCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res,StatusCodes.NOT_FOUND, {});
    }
}


const getUserCrtfc = async (req,res) =>{
    try{
        const userCrtfc = await crtfcAuthService.getCrtfc(req.params.userId);

        return sendResponse(res, StatusCodes.OK, userCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, StatusCodes.NOT_FOUND, {});
    }
}

const putCrtfc = async (req,res)=>{
    try{
        const id = req.params.crtfcId;
        const schema = crtfcBodySchema.putCrtfcSchema();
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, {});
        }

        const updatedCrtfc = await crtfcAuthService.setCrtfc(id,{toUpdate: {...req.body}});

        return sendResponse(res, StatusCodes.OK, updatedCrtfc);

    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, StatusCodes.NOT_FOUND, {});
    }
}

const deleteCrtfc = async (req,res)=>{
    try{
        const deleteCrtfc = await crtfcAuthService.deleteCrtfc(req.params.crtfcId);

        return sendResponse(res, StatusCodes.OK, deleteCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, StatusCodes.NOT_FOUND, {});
    }
}

export { postCrtfc, getMyCrtfc, getUserCrtfc, putCrtfc, deleteCrtfc};
