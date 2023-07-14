import {Router} from "express";
import { login_required } from "../middlewares/login_required";
import {createValidator} from "express-joi-validation";
import { crtfcBodySchema } from "../utils/validatorSchema/crtfcBodySchema";
import { 
    postCrtfc,
    userGetCrtfc,
    getCrtfc,
    putCrtfc,
    deleteCrtfc 
} from "../controllers/crtfc-controller";

const validator = createValidator();

const crtfcAuthRouter = Router();

crtfcAuthRouter.post('/crtfc', login_required, validator.body(crtfcBodySchema.postCrtfcSchema()), postCrtfc);

crtfcAuthRouter.get("/crtfc", login_required, userGetCrtfc);

crtfcAuthRouter.get("/crtfc/:id", login_required, getCrtfc);

crtfcAuthRouter.put('/crtfc/:id', login_required, validator.body(crtfcBodySchema.putCrtfcSchema()), putCrtfc);

crtfcAuthRouter.delete('/crtfc/:id', login_required, deleteCrtfc);


export {crtfcAuthRouter};