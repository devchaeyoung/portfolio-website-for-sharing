import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { createValidator } from "express-joi-validation";
import { crtfcBodySchema } from "../utils/validatorSchema/crtfcBodySchema";
import {
    postCrtfc,
    userGetCrtfc,
    getCrtfc,
    putCrtfc,
    deleteCrtfc,
} from "../controllers/crtfc-controller";

const validator = createValidator();

const crtfcAuthRouter = Router();

crtfcAuthRouter
    .route("/crtfc")
    .post(
        login_required,
        validator.body(crtfcBodySchema.postCrtfcSchema()),
        postCrtfc
    )
    .get(login_required, userGetCrtfc);

crtfcAuthRouter
    .route("/crtfc/:id")
    .get(login_required, getCrtfc)
    .put(
        login_required,
        validator.body(crtfcBodySchema.putCrtfcSchema()),
        putCrtfc
    )
    .delete(login_required, deleteCrtfc);

export { crtfcAuthRouter };
