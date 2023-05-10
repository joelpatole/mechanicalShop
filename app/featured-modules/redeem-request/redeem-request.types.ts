import { Schema } from "mongoose";


export interface IRedeemRequest{
   _id? : Schema.Types.ObjectId | String,
   gift_id : Schema.Types.ObjectId,
   shop_id : Schema.Types.ObjectId | String,
   shopOwner? :String,
   shopAddress? : String
   name : String,
   rewardPoints : Number,
   status? : Number | String
}

