
// const RewardSchema = new BaseSchema({
//     name: {
//         type: String,
//         required: true
//     },
//     rewardPoints: {
//         type: Number,
//         required: true,
//         default: 0
//     }
// })

import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IRedeemRequest } from "./redeem-request.types";
import { status } from "../../utility/constant";

const RedeemRequestSchema = new BaseSchema({
    gift_id : {
      type : Schema.Types.ObjectId,
      required : true
    },
    shop_id : {
        type : Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    rewardPoints : {
        type : Number,
        required : true
    },
    shopOwner : {
        type : String,
        required : true  
    },
    shopAddress : {
        type : String,
        required : true
    },
    status : {
        type : Number,
        default : status.pending
    }
})

type RedeemRequestDocument = Document & IRedeemRequest;

export const RedeemRequestModel = model<RedeemRequestDocument>("redeemrequest", RedeemRequestSchema)