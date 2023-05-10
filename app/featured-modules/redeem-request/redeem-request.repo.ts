
import mongoose, { FilterQuery, Schema, UpdateQuery } from "mongoose";
import { RedeemRequestModel } from "./redeem-request.schema";
import { IRedeemRequest } from "./redeem-request.types";
import { IReward } from "../reward/reward.types";
import { Paggination } from "../../utility/constant";



const orderGifts = async(giftOrder : IRedeemRequest)=>{
  console.log("giftOrder is,", giftOrder);
  const result = await RedeemRequestModel.create(giftOrder);
  return result;
}

const seeGiftHistory = async(shop_id : Schema.Types.ObjectId)=>{
  const result = await RedeemRequestModel.find({shop_id});
  return result
}

const findAll = async(filter : FilterQuery<IRedeemRequest>,pageNumber:Number)=>{
  console.log(filter);
  const dataPerPage = Paggination.count
  const result = await RedeemRequestModel.find({isDeleted : false, ...filter}).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage).sort({'createdAt' : -1});
  return result;
}

const update = async(filter : FilterQuery<IRedeemRequest>,data:UpdateQuery<IRedeemRequest>)=>{
   const result = await RedeemRequestModel.updateMany({ isDeleted: false, ...filter }, data)
   return result;
}

const findById = async(_id : Schema.Types.ObjectId)=>{
  const result = await RedeemRequestModel.findById(_id);
  return result
}

export default {
    orderGifts,
    seeGiftHistory,
    findAll,
    update,
    findById
}