import { educationAuthService } from "../services/educationService";
const httpStatus = require('http-status-codes');

const sendResponse = function (res, statusCode, data) {
    res.status(statusCode).json(data);
};

const postEducation = async (req, res) => {
    try {
        
        const author = req.currentUserId;

        const addMyEducation = await educationAuthService.addEducation({toCreate: { ...req.body,author }});
    
    return sendResponse(res, httpStatus.OK, addMyEducation);
    } catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
    };

const getMyEducation = async (req,res)=>{
    try {

        const myEducation = await educationAuthService.getEducation(req.currentUserId);

        return sendResponse(res, httpStatus.OK, myEducation);
    } catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const getUserEducation = async (req,res) => {
    try{
        const userEducation = await educationAuthService.getEducation(req.params.userId);
        return sendResponse(res, httpStatus.OK, userEducation);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const putEducation = async (req,res) => {
    try {
        const userId = req.params.userId;

        const updatedEducation = await educationAuthService.setEducation(userId, {toUpdate : {...req.body}});

        return sendResponse(res, httpStatus.OK, updatedEducation);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const deleteEducation = async (req,res) => {
    try{

        const deleteEducation = await educationAuthService.deleteEducation(req.params.userId);
        return sendResponse(res, httpStatus.CREATED, deleteEducation);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

export { postEducation, getMyEducation, getUserEducation, putEducation, deleteEducation};
