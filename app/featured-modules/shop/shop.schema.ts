// import { model } from "mongoose";
// import { BaseSchema } from "../../utility/base.schema";

import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { shopType } from "./shop.type";

const shopSchema = new BaseSchema({
  owner_id: {
    type: Schema.Types.ObjectId,
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
    default : 0
  },

  inventory: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
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

export const shopModel = model<shopType>("Shop", shopSchema);

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
