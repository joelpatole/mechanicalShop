import { Router} from "express";
import { roles } from "../../utility/constant";
import {permit} from "../../utility/authorize"
import redeemRequestServices from "./redeem-request.services";
import { ResponseHandler } from "../../utility/response.handler";
import { REDEEM_REQUEST_RESPONSE } from "./redeem-request.response";



const router = Router()

router.get("/get-redeem-requests",permit([roles.ADMIN]),async(req,res,next)=>{
    try{
        const {page,...rest} = req.query
        const pageNumber = page;
       const filter = rest;
       console.log(filter)
       const result = await redeemRequestServices.findAll(filter,Number(pageNumber));
       res.send(new ResponseHandler(result));
    }catch(err){
        next(err)
    }
})

router.patch("/approve-redeem-request/:_id",permit([roles.ADMIN]),async(req,res,next)=>{
  try{
    const filter = req.params
    const data = req.body;
    const result = await redeemRequestServices.update(filter,data);
    if(!result)throw REDEEM_REQUEST_RESPONSE.COULD_NOT_PERFORM_ACTION
    res.send(new ResponseHandler(result));
  }catch(err){

  }
})


export default router;