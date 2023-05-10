import { FilterQuery, Schema, UpdateQuery } from "mongoose";
import { orderStatusHelper } from "../../utility/enumUtil";
import shopService from "../shop/shop.service";
import redeemRequestRepo from "./redeem-request.repo"
import { IRedeemRequest } from "./redeem-request.types"

const findAll = async(filter : FilterQuery<IRedeemRequest>, pageNumber :Number)=>{
    const filterKeys = Object.keys(filter);
    console.log(filter)
    console.log(filterKeys)
    for(let key of filterKeys){
      if(key.includes('status')){
        const numericStatusValue = orderStatusHelper.convertStringToEnumValue(filter.status);
        const result = await redeemRequestRepo.findAll({status : numericStatusValue},pageNumber);
        return result;
      }
    }
    const result = await redeemRequestRepo.findAll(filter,pageNumber);
    return result; 
  }

const orderGifts = async(giftOrder : IRedeemRequest)=>{
   const shop = await shopService.findById(Object(giftOrder.shop_id))
   let finalResult = {};
   if(shop){
    giftOrder.shopAddress = shop.address;
    giftOrder.shopOwner = shop.name;
   }
   const result = await  redeemRequestRepo.orderGifts(giftOrder);
   if(result && result.status){
    finalResult = {
        redeemeReques_id : result._id,
        giftName : result.name,
        rewardPoints : result.rewardPoints,
        shop_id : result.shop_id,
        shopOwner : result.shopOwner,
        shopAddress : result.shopAddress,
        status : orderStatusHelper.convertEnumValueToString(result.status),
       }
    
   }
   return finalResult;
}

const seeGiftHistory = async(shop_id : Schema.Types.ObjectId)=>{
    console.log("hello World service")
  const result = await redeemRequestRepo.seeGiftHistory(shop_id);
  console.log("result in redeme request Service is ",result);
  return result;
}

const update = async(filter : FilterQuery<IRedeemRequest>,data:UpdateQuery<IRedeemRequest>)=>{
    const dataKeys = Object.keys(data);
    for(let key of dataKeys){
      if(key.includes('status')){
        const numericStatusValue = orderStatusHelper.convertStringToEnumValue(data.status);
        await redeemRequestRepo.update(filter,{status : numericStatusValue});
        const redeemRequestObject = await redeemRequestRepo.findById(filter._id);
        if(redeemRequestObject){
            const shop = await shopService.findById(Object(redeemRequestObject.shop_id));
            const newRewardPoints =  Number(redeemRequestObject?.rewardPoints) * -1
            const result = await shopService.update(Object(shop?._id),{rewardPoints : newRewardPoints})  
            return result;
        }
      }
    const result = await redeemRequestRepo.update(filter,data);
    return result;
}


}
    

export default{
    orderGifts,
    seeGiftHistory,
    findAll,
    update
}