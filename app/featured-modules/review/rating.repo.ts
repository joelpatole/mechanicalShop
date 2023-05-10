import mongoose, { FilterQuery, Schema, UpdateQuery } from "mongoose"
import { RatingModel } from "./rating.schema"
import { IRating } from "./rating.types"
import { RewardModel } from "../reward/reward.schema"


const getShopRatingObject = async(shop_id : Schema.Types.ObjectId)=>{
    const shopRatingObject = await RatingModel.find({shop_id:shop_id})
    return shopRatingObject
}


const rateAShop = async(shop_id : Schema.Types.ObjectId, averageRating : Number,ratingArray : Number[])=>{
        const result = await RatingModel.create({shop_id:shop_id, averageRating : averageRating,ratingArray : ratingArray})
        return result;
}

const update = async(filter: FilterQuery<IRating>, data : UpdateQuery<IRating>)=>{
    console.log("inside rating repo");
    console.log(data)
    const result =  await RatingModel.updateMany(filter,data)
    console.log("exit repo")
    console.log(result)
    return result;
}

const find = async(filter : FilterQuery<IRating>)=>{
    const result = await RatingModel.find({...filter})
    return result;
}

const findOne = async(filter : FilterQuery<IRating>)=>{
    const result = await RatingModel.findOne({shop_id : filter});
    return result
}

export default {
    rateAShop,
    getShopRatingObject,
    update,
    find ,
    findOne   
}