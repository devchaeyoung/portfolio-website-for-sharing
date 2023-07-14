import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationAuthService } from "../services/educationService";
const educationAuthRouter = Router();

<<<<<<< HEAD
educationAuthRouter.post(
  "/education",
  login_required,
  async (req, res, next) => {
    try {
      const { schoolName, major, crnt } = req.body;

      const author = await User.findById(req.currentUserId);

      const newEducation = await educationAuthService.addEducation(
        schoolName,
        major,
        crnt,
        author
      );
      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
=======
educationAuthRouter.post("/education",
    login_required,
    async (req, res, next) => {
        try {
            const author = req.currentUserId;
            const { schoolName, major, crnt } = req.body;

        const newEducation = await educationAuthService.addEducation(
                schoolName,
                major,
                crnt,
                author
            );
            res.status(201).json(newEducation);
        } catch (error) {
            next(error);
        }
>>>>>>> dba4ac75715870c433e7588dc7d80433bf1e1e01
    }
  }
);

<<<<<<< HEAD
educationAuthRouter.put(
  "/education/:id",
  login_required,
  async (req, res, next) => {
    try {
      const educationId = req.params.id;
      const schoolName = req.body.schoolName ?? null;
      const major = req.body.major ?? null;
      const crnt = req.body.crnt ?? null;
=======

educationAuthRouter.get("/education",
    login_required,
    async (req, res, next) => {
        try {

            const education = await educationAuthService.getEducation(req.currentUserId);

            res.status(200).send(education);
        } catch (error) {
            next(error);
        }
    }
);

educationAuthRouter.put("/education/:id",
    login_required,
    async (req, res, next) => {
        try {
            const educationId = req.params.id;
            const schoolName = req.body.schoolName ?? null;
            const major = req.body.major ?? null;
            const crnt = req.body.crnt ?? null;
>>>>>>> dba4ac75715870c433e7588dc7d80433bf1e1e01

      const toUpdate = { schoolName, major, crnt };

      const updatedEducation = await educationAuthService.setEducation({
        educationId,
        toUpdate,
      });

      res.status(201).send(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

<<<<<<< HEAD
educationAuthRouter.get(
  "/education",
  login_required,
  async (req, res, next) => {
    try {
      const education = await educationAuthService.getEducation(
        req.currentUserId
      );

      res.status(200).send(education);
    } catch (error) {
      next(error);
    }
  }
);
=======

educationAuthRouter.delete('/education/:id',
    login_required,
    async (req,res,next)=>{
        try{

            const deleteEducation = await educationAuthService.deleteEducation(req.params.id);
            res.status(200).send(deleteEducation);
        }catch(error){
            next(error);
        }
    });
>>>>>>> dba4ac75715870c433e7588dc7d80433bf1e1e01

export { educationAuthRouter };
