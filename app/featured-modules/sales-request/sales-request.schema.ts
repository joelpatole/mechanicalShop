import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { status } from "../../utility/constant";
import { ISalesRequestType } from "./sales-request.types";




const salesRequestSchema = new BaseSchema({
    shop_id : {
       type : Schema.Types.ObjectId,
       required : true
    },
    items_sold : {
        type : [
            {
                product_id : {
                    type : Schema.Types.ObjectId,
                    required: true
                },
                productName : {
                    type : String,
                    required : true
                },
                quantity : {
                    type : Number,
                    required : true
                },
                price_per_product :{
                    type : Number,
                    required : true
                },
                total : {
                    type : Number,
                    required : true
                },
                rewardPoints: {
                    type : Number,
                    required : true
                }
            }
        ],
        required: true
    },
    totalRevenu : {
        type : Number,
        required : true
    },
    totalRewardPoints : {
        type : Number,
        required : true
    },
    status : {
        type : Number,
        default : status.pending
    }
});

export const salesRequestModel = model<ISalesRequestType>("salesRequest", salesRequestSchema);