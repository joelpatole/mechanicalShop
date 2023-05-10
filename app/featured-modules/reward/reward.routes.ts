import { Router, Request,Response,NextFunction } from "express";
import rewardServices from "./reward.services";
import { REWARD_RESPONSES } from "./reward.responses";
import { ResponseHandler } from "../../utility/response.handler";
import { permit } from "../../utility/authorize";
import { roles } from "../../utility/constant";
import { ADD_REWARD_VALIDATOR, REQUEST_GIFT_VALIDATION } from "./reward.validation";

const router = Router()


router.post('/add-new-gift',permit([roles.ADMIN]),ADD_REWARD_VALIDATOR,async(req:Request,res : Response,next : NextFunction)=>{
    try{
     const gift = req.body;   
     const result = await rewardServices.create(gift)
     if(!result) throw REWARD_RESPONSES.SOMETHING_WENT_WRONG;
     res.send(new ResponseHandler(result));
    }catch(err){
        next(err)
    }
})

router.get("/see-eligible-rewards/:shop_id",permit([roles.OWNER]),async(req,res,next)=>{
    try{
     const shop_id = req.params.shop_id;
     const {page} = req.query;   
     const result = await rewardServices.getEligibleRewards(Object(shop_id),Number(page))
     if(!result) throw REWARD_RESPONSES.SOMETHING_WENT_WRONG
     res.send(new ResponseHandler(result))
    }catch(err){
        next(err)
    }
})

router.post("/order-gift",permit([roles.OWNER]),REQUEST_GIFT_VALIDATION,async(req:Request,res:Response,next:NextFunction)=>{
   try{ 
    const giftOrder = req.body.giftOrder
    console.log("gift Order is ",giftOrder)
    const result = await rewardServices.orderGift(giftOrder)
    if(!result) throw REWARD_RESPONSES.SOMETHING_WENT_WRONG
    res.send(new ResponseHandler(result));
   }catch(err){
    next(err)
   }
})






export default router;