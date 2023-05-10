import { Schema } from "mongoose";


export interface IRating {
   _id? : Schema.Types.ObjectId,
   shop_id : Schema.Types.ObjectId,
   ratingArray : Number[],
   averageRating? : Number
}