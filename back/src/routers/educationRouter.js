import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {createValidator} from "express-joi-validation";
import { educationBodySchema } from "../utils/validatorSchema/educationBodySchema";
import { 
    deleteEducation,
    getEducation, 
    postEducation, 
    putEducation, 
    userGetEducation 
} from "../controllers/education-controller";

const validator = createValidator();

const educationAuthRouter = Router();

<<<<<<< HEAD
educationAuthRouter.post("/education",login_required, validator.body(educationBodySchema.postEducationSchema()), postEducation);

educationAuthRouter.get("/education", login_required, userGetEducation);

educationAuthRouter.get("/education/:id", login_required, getEducation);

educationAuthRouter.put("/education/:id",login_required, validator.body(educationBodySchema.putEducationSchema()), putEducation);

educationAuthRouter.delete("/education/:id", login_required, deleteEducation);
=======
educationAuthRouter.route('/education')
    .post(login_required, validator.body(educationBodySchema.postEducationSchema()), postEducation)
    .get(login_required, userGetEducation);

educationAuthRouter.route('/education/:id')
    .get(login_required, getEducation)
    .put(login_required, validator.body(educationBodySchema.putEducationSchema()), putEducation)
    .delete(login_required, deleteEducation);

>>>>>>> 64c2390c5f1d7d13e160547f245ce0fa5bdd1e35

export { educationAuthRouter };
