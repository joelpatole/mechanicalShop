"use strict";
// import { model } from "mongoose";
// import { BaseSchema } from "../../utility/base.schema";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const shopSchema = new base_schema_1.BaseSchema({
    owner_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    contact: {
        type: Number,
    },
    address: {
        type: String,
    },
    location: {
        type: String,
    },
    rewardPoints: {
        type: Number,
        default: 0,
    },
    shopRevenu: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0
    },
    inventory: {
        type: [
            {
                productId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                },
            },
        ],
        default: [],
    },
});
exports.shopModel = (0, mongoose_1.model)("Shop", shopSchema);
/////////////////////////////////////////////////////////////////
/*
    {
        Owner_id,
        Owner_email,
        Ownername,
        contact,
        address,
        location,
        rewardPoints : default 0,
        shopRevenu : default 0,
        rating,
        inventory[{productId:1,quantity:4},{},...],

    }

    //sales schema
    {
        [
            {
              shopId : ,
              item : ,
              qty : ,
              price : ,
              date : ,
            },
            {

            }
        ]

    }


*/
//# sourceMappingURL=shop.schema.js.map