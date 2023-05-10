import { NextFunction, Router, Request,Response } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import shopService from "./shop.service";
import { roles } from "../../utility/constant";
import { permit } from "../../utility/authorize";
import { Schema } from "mongoose";
import productServices from "../product/product.services";
import productRepo from "../product/product.repo";
import { SHOP_RESPONSE } from "./shop.responses";
import { GET_TOP_10_SHOPS_VALIDATOR, RATE_SHOP_VALIDATOT, SHOP_ID_VALIDATOR } from "./shop.validations";
import ratingService from "../review/rating.service";

const router = Router();

router.get("/see-all-shops", async (req, res, next) => {
  try {
    const {page,...rest} = req.query
    const pageNumber = page;
    console.log("page number is ",page)
    console.log("rest is ",rest)
    const result = await shopService.findAll(rest, Number(pageNumber));
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});



router.get("/get-top-shops/:queryType", permit([roles.ADMIN]),async (req:Request, res:Response, next:NextFunction) => {
  try {
    const  queryType  = req.params.queryType;
    const result = await shopService.getTopShops(queryType);
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});

router.post("/create-shop", permit([roles.ADMIN]), async (req, res, next) => {
  try {
    const role = roles.OWNER;
    const { name, email, password, ...shop } = req.body;
    const result = await shopService.createShop(
      { name, email, ...shop },
      { name, email, password, role }
    );
    res.send(new ResponseHandler(result));
  } catch (err) {
    next(err);
  }
});


router.get("/see-all-shops",async(req,res,next)=>{
  try{
   const {page,...rest} = req.query; 
   const result = await shopService.findAll(rest,Number(page))
   if(!result) throw SHOP_RESPONSE.SHOP_NOT_FOUND
   res.send(new ResponseHandler(result));
  }catch(err){
    next(err)
  }
})

router.get("/get-a-shop/:shop_id",async (req, res, next) => {
  try {
    const shop_id = Object(req.params.shop_id);
    console.log(shop_id);
    let result;
    if (req.params.shop_id) {
      const shop = await shopService.findById(shop_id);
      if (shop?.inventory != undefined) {
        result = await productServices.getProductDetialsOfShop(shop);
        res.send(new ResponseHandler(result));
      }  
    }else {
      throw SHOP_RESPONSE.SHOP_NOT_FOUND;
    }
  } catch (err) {
    next(err);
  }
});

router.post("/rate-a-shop",RATE_SHOP_VALIDATOT,async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const shop_id = req.body.shop_id;
    const rating = req.body.rating;
    const result = await ratingService.rateAShop(shop_id,rating)
    if(!result) throw SHOP_RESPONSE.SOMETHING_WENT_WRONG
    res.send(new ResponseHandler(result));
  }catch(err){

  }
})



router.get("/see-gift-history/:shop_id",permit([roles.ADMIN,roles.OWNER]),async(req:Request,res:Response,next : NextFunction)=>{
  try{
    const {shop_id} = req.params
    console.log(shop_id);
    const result = await shopService.seeGiftHistory(Object(shop_id));
    if(!result) throw SHOP_RESPONSE.SHOP_NOT_FOUND
    res.send(new ResponseHandler(result))
  }catch(err){
    next(err)
  }
})

export default router;
