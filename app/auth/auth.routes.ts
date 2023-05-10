import { NextFunction, Request, Response, Router } from "express";
import authServices from "./auth.services";
import { ResponseHandler } from "../utility/response.handler";
import { permit } from "../utility/authorize";
import { roles } from "../utility/constant";
import { LOGIN_VALIDATION } from "./auth.validation";

const router = Router();
//middleware to check if admin
router.post("/register-admin",async (req, res, next) => {
    try {
        const user = req.body;
        const result = await authServices.register(user);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.post("/login", LOGIN_VALIDATION ,async (req:Request, res:Response, next:NextFunction) => {
    try {
        const credentials = req.body;
        const result = await authServices.login(credentials);
        res.send(new ResponseHandler(result));
    } catch (err) {
        
        next(err);
    }
});

router.post("/logout", (req, res, next) => {

});

export default router;