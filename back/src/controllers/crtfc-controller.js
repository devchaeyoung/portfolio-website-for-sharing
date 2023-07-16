import { crtfcAuthService } from "../services/crtfcService";
import { Router } from "express";
const httpStatus = require('http-status-codes');
const { morgan, logger, morganFormat } = require('../utils/logging');
const crtfcAuthRouter = Router();

crtfcAuthRouter.use(morgan(morganFormat));

const sendResponse = function (res, statusCode, data) {
    res.status(statusCode).json(data);
};

const postCrtfc = async (req,res) => {
    try{
        const author = req.currentUserId;

        const addMyCrtfc = await crtfcAuthService.addCrtfc({toCreate : {...req.body,author}});

        logger.info('POST / addCrtfc');
        return sendResponse(res, httpStatus.OK, addMyCrtfc);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const getMyCrtfc = async (req,res) =>{
    try{

        const myCrtfc = await crtfcAuthService.getCrtfc(req.currentUserId);

        logger.info('GET / getMyCrtfc');
        return sendResponse(res, httpStatus.OK, myCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}


const getUserCrtfc = async (req,res) =>{
    try{
        const userCrtfc = await crtfcAuthService.getCrtfc(req.params.userId);

        logger.info('GET / getUserCrtfc');
        return sendResponse(res, httpStatus.OK, userCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const putCrtfc = async (req,res)=>{
    try{
        const id = req.params.crtfcId;

        const updatedCrtfc = await crtfcAuthService.setCrtfc(id,{toUpdate: {...req.body}});

        logger.info('PUT / updateCrtfc');
        return sendResponse(res, httpStatus.OK, updatedCrtfc);

    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const deleteCrtfc = async (req,res)=>{
    try{
        const deleteCrtfc = await crtfcAuthService.deleteCrtfc(req.params.crtfcId);

        logger.info('DELETE / deleteCrtfc');
        return sendResponse(res, httpStatus.OK, deleteCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

export { postCrtfc, getMyCrtfc, getUserCrtfc, putCrtfc, deleteCrtfc};