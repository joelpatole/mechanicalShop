import { Router ,Request,Response,NextFunction} from "express";
import productServices from "./product.services";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constant";
import { ADD_PRODUCT_VALIDATOR } from "./product.validation";

const router = Router();
//middleware to check if admin

router.get("/get-all-products",permit([roles.ADMIN]), async(req, res, next) => {
   try{
     const result = await productServices.find({})
     res.send(new ResponseHandler(result))
   }catch(err){
     next(err);
   }
});

//middleware to check if admin
router.post("/add-products", permit([roles.ADMIN]),ADD_PRODUCT_VALIDATOR,async(req:Request, res:Response, next:NextFunction) => {
   try{
    const product = req.body;
     const result = await productServices.addProducts(product)
     res.send(new ResponseHandler(result))
   }catch(err)
   {
    next(err)
   }
});

export default router;