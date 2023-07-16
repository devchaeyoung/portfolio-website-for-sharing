import { educationAuthService } from "../services/educationService";
import { Router } from "express";
const httpStatus = require('http-status-codes');
const { morgan, logger, morganFormat } = require('../utils/logging');
const crtfcAuthRouter = Router();

crtfcAuthRouter.use(morgan(morganFormat));

const sendResponse = function (res, statusCode, data) {
    res.status(statusCode).json(data);
};

const postEducation = async (req, res) => {
    try {
        
        const author = req.currentUserId;

        const addMyEducation = await educationAuthService.addEducation({toCreate: { ...req.body,author }});
    
        logger.info('POST / addEducation');
        return sendResponse(res, httpStatus.OK, addMyEducation);
    } catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
    };

const getMyEducation = async (req,res)=>{
    try {

        const myEducation = await educationAuthService.getEducation(req.currentUserId);

        logger.info('GET / getMyEducation');
        return sendResponse(res, httpStatus.OK, myEducation);
    } catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const getUserEducation = async (req,res) => {
    try{
        const userEducation = await educationAuthService.getEducation(req.params.userId);

        logger.info('GET / getUserEducation');
        return sendResponse(res, httpStatus.OK, userEducation);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const putEducation = async (req,res) => {
    try {
        const id = req.params.educationId;

        const updatedEducation = await educationAuthService.setEducation(id, {toUpdate : {...req.body}});

        logger.info('PUT / updateEducation');
        return sendResponse(res, httpStatus.OK, updatedEducation);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const deleteEducation = async (req,res) => {
    try{

        const deleteEducation = await educationAuthService.deleteEducation(req.params.educationId);

        logger.info('DELETE / deleteEducation');
        return sendResponse(res, httpStatus.CREATED, deleteEducation);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

export { postEducation, getMyEducation, getUserEducation, putEducation, deleteEducation};
