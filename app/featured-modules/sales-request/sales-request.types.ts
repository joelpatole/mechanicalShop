import { Schema } from "mongoose";



export interface ISalesRequest{
   shop_id : Schema.Types.ObjectId,
   items_sold : ISoldItem[],
   totalRevenu : Number,
   totalRewardPoints : Number,
   status : Number
}


export interface ISoldItem{
   product_id : Schema.Types.ObjectId,
   productName : String,
   quantity : Number,
   price_per_product : Number,
   total : Number,
   rewardPoints: Number
}




export type ISalesRequestType = Document & ISalesRequest