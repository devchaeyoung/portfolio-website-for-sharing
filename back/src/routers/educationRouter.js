import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { 
    deleteEducation,
    getEducation, 
    postEducation, 
    putEducation, 
    userGetEducation 
} from "../controllers/education-controller";
const educationAuthRouter = Router();

educationAuthRouter.post("/education", login_required, postEducation);

educationAuthRouter.get("/education", login_required, userGetEducation);

educationAuthRouter.get("/education/:id", login_required, getEducation);

educationAuthRouter.put("/education/:id", login_required, putEducation);

educationAuthRouter.delete('/education/:id', login_required, deleteEducation);

export { educationAuthRouter };
