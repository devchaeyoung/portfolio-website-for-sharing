import {Router} from "express";
import { login_required } from "../middlewares/login_required";
import { 
    postCrtfc,
    userGetCrtfc,
    getCrtfc,
    putCrtfc,
    deleteCrtfc 
} from "../controllers/crtfc-controller";

const crtfcAuthRouter = Router();

crtfcAuthRouter.post('/crtfc', login_required, postCrtfc);

crtfcAuthRouter.get("/crtfc", login_required, userGetCrtfc);

crtfcAuthRouter.get("/crtfc/:id", login_required, getCrtfc);

crtfcAuthRouter.put('/crtfc/:id', login_required, putCrtfc);

crtfcAuthRouter.delete('/crtfc/:id', login_required, deleteCrtfc);


export {crtfcAuthRouter};