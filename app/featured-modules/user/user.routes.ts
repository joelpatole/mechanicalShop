import { Router } from "express";
import userServices from "./user.services";
import { ResponseHandler } from "../../utility/response.handler";
import shopService from "../shop/shop.service";
import { IShop } from "../shop/shop.type";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constant";
import { USER_RESPONSES } from "./user.responses";

const router = Router();

router.get("/get-admin-dashboard", permit([roles.ADMIN]),async (req, res, next) => {
    try {
        const heighestRatedShop = await shopService.getShopByRatings(1);
        const lowestRatedShop = await shopService.getShopByRatings(-1);
        const result = ([heighestRatedShop, lowestRatedShop])
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
});

router.get("/get-owner-dashboard/:owner_id",permit([roles.OWNER]),async (req,res,next)=>{
    try{
      const owner_id = Object(req.params.owner_id);  
      const shop = await shopService.find({owner_id});
      if(shop !== null || shop !== undefined){
        const ownerDashboardResult = await userServices.getDetialsOfShop(shop[0]);
        res.send(new ResponseHandler(ownerDashboardResult))
      }
      else
      {
        throw USER_RESPONSES.COULD_NOT_FETCH
      }
      
      
    }catch(err){
        next(err)
    }
})






export default router;