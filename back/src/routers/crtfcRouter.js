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

<<<<<<< HEAD
crtfcAuthRouter.post('/crtfc', login_required, validator.body(crtfcBodySchema.postCrtfcSchema()), postCrtfc);

crtfcAuthRouter.get("/crtfc", login_required, userGetCrtfc);

crtfcAuthRouter.get("/crtfc/:id", login_required, getCrtfc);

crtfcAuthRouter.put('/crtfc/:id', login_required, validator.body(crtfcBodySchema.putCrtfcSchema()), putCrtfc);

crtfcAuthRouter.delete('/crtfc/:id', login_required, deleteCrtfc);
=======
crtfcAuthRouter.route('/crtfc')
    .post(login_required, validator.body(crtfcBodySchema.postCrtfcSchema()), postCrtfc)
    .get(login_required, userGetCrtfc);

crtfcAuthRouter.route('/crtfc/:id')
    .get(login_required, getCrtfc)
    .put(login_required, validator.body(crtfcBodySchema.putCrtfcSchema()), putCrtfc)
    .delete(login_required, deleteCrtfc);
>>>>>>> 64c2390c5f1d7d13e160547f245ce0fa5bdd1e35


export {crtfcAuthRouter};