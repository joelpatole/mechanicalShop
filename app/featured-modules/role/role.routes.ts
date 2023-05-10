import { Router } from "express";
import roleServices from "./role.services";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constant";

const router = Router();

router.post("/add-new-role",permit([roles.ADMIN]), async (req, res, next) => {
    try {
        const {id, name} = req.body;
        const result = await roleServices.add({_id: id, name: name});
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.delete("/delete-a-role/:id", permit([roles.ADMIN]),async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await roleServices.remove(id);
        res.send(new ResponseHandler(result));
    } catch (err) {
        console.log("error")
        next(err);
    }
});

export default router;