import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { ProductType } from "./product.types";

const productSchema = new BaseSchema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    threshold: {
        type: Number,
        required: true
    },
    rewardPoints: {
        type: Number,
        default: 0
    }
})

export const productModel = model<ProductType>("Product", productSchema);