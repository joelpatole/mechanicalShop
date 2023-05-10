import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IItem, IOrderRequestType } from "./order.type";
import { status } from "../../utility/constant";

const orderSchema = new BaseSchema({
  shop_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: Number,
    default: status.pending,
  },
  quantity: {
    type: Number,
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const orderModel = model<IOrderRequestType>("Order", orderSchema);
