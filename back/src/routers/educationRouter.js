import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { createValidator } from "express-joi-validation";
import { educationBodySchema } from "../utils/validatorSchema/educationBodySchema";
import {
    deleteEducation,
    getEducation,
    postEducation,
    putEducation,
    userGetEducation,
} from "../controllers/education-controller";

const validator = createValidator();

const educationAuthRouter = Router();

educationAuthRouter
    .route("/education")
    .post(
        login_required,
        validator.body(educationBodySchema.postEducationSchema()),
        postEducation
    )
    .get(login_required, userGetEducation);

educationAuthRouter
    .route("/education/:id")
    .get(login_required, getEducation)
    .put(
        login_required,
        validator.body(educationBodySchema.putEducationSchema()),
        putEducation
    )
    .delete(login_required, deleteEducation);

export { educationAuthRouter };
