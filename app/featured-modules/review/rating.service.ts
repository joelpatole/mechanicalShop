import { Schema } from "mongoose";
import shopService from "../shop/shop.service";
import ratingRepo from "./rating.repo";
import { IRedeemRequest } from "../redeem-request/redeem-request.types";

const rateAShop = async (shop_id: Schema.Types.ObjectId, rating: Number) => {
  console.log("inside rating services");

  //push into the array
  // search if doc exists
  const shopRatngRecord = await ratingRepo.findOne(shop_id);
  console.log(shopRatngRecord);
  if(shopRatngRecord)
  {
    const array = shopRatngRecord.ratingArray
    array.push(rating);
    await ratingRepo.update({shop_id : shop_id},{ratingArray : array})
    await ratingRepo.update({shop_id : shop_id},[{$set: { averageRating: { $avg: "$ratingArray" } },
    }])
    const result = await ratingRepo.findOne(shop_id);
    if(result?.averageRating){
      await shopService.update(shop_id,{rating : result?.averageRating});
      return result;
    } 
  }
  else
  {
    const ratingArray :Number[]= [rating];
    await ratingRepo.rateAShop(shop_id,rating,ratingArray);
    await shopService.update(shop_id,{rating : ratingArray[0]});
    const result = await shopService.findById(shop_id);
    return result;
  }

};

export default {
  rateAShop,
};
