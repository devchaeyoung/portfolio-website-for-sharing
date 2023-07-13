import {Router} from "express";
import { login_required } from "../middlewares/login_required";
import { crtfcAuthService } from "../services/crtfcService";
import {User} from "../db";
const crtfcAuthRouter = Router();

crtfcAuthRouter.post('/crtfc',
    login_required,
    async (req,res,next)=>{
        try{
            console.log(111111111111);
            const {title,licence,startDate,endDate,issuer} = req.body;
            const userId = await req.currentUserId;
            const author = await User.findById(userId);
            console.log(author);
            const newCrtfc = await crtfcAuthService.addCrtfc({
                title,
                licence,
                startDate,
                endDate,
                issuer,
                author
            });
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
            const startDate = req.body.startDate ?? null;
            const endDate = req.body.endDate ?? null;
            const issuer = req.body.issuer ?? null;

            const toUpdate = {title, licence, startDate, endDate, issuer};

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
            const userId = req.currentUserId;
        const crtfc = await crtfcAuthService.getCrtfc(userId);


        res.status(200).send(crtfc);
        }catch(error){
            next(error);
        }
    });


export {crtfcAuthRouter};