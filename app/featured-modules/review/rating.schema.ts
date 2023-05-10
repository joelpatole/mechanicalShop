import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IRating } from "./rating.types";

const ratingSchema = new BaseSchema({
    shop_id : {
        type : Schema.Types.ObjectId,
        required : true
    },
    ratingArray : {
        type : [],
        required : true
    },
    averageRating : {
        type : Number,
        required : true
    }
})

type RatingDocument = Document & IRating;
export const RatingModel = model<RatingDocument>("rating", ratingSchema);
