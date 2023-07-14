import {Router} from "express";
import { login_required } from "../middlewares/login_required";
<<<<<<< HEAD
import { crtfcAuthService } from "../services/crtfcService";
import {User} from "../db";
const crtfcAuthRouter = Router();

crtfcAuthRouter.post('/crtfc',
    login_required,
    async (req,res,next)=>{
        try{
            const {title,licence,issuedDate,issuer,langscore} = req.body;

            const author = await User.findById(req.currentUserId);
            console.log(author);
            const newCrtfc = await crtfcAuthService.addCrtfc(
                title,
                licence,
                issuedDate,
                issuer,
                langscore,
                author
            );
            res.status(201).json(newCrtfc);
        }catch(error){
            next(error);
        }

});

crtfcAuthRouter.put('/crtfc/:id',
    login_required,
    async (req,res,next)=>{
        try{
            const crtfcId = req.params.id;
            const title = req.body.title ?? null;
            const licence = req.body.licence ?? null;
            const issuedDate = req.body.issuedDate ?? null;
            const issuer = req.body.issuer ?? null;
            const langscore = req.body.langscore ?? null;

            const toUpdate = {title, licence, issuedDate, issuer, langscore};

            const updatedCrtfc = await crtfcAuthService.setCrtfc({crtfcId,toUpdate});

            res.status(201).send(updatedCrtfc);
        
    }catch(error){
        next(error);
    }
});




crtfcAuthRouter.get("/crtfc",
    login_required,
    async (req,res,next)=>{
        try{

            const crtfc = await crtfcAuthService.getCrtfc(req.currentUserId);


            res.status(200).send(crtfc);
        }catch(error){
            next(error);
        }
    });
=======
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
>>>>>>> 80c782457e708bedd27d2bbb1e5d4110232ae594


export {crtfcAuthRouter};