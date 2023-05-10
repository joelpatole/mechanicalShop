import { Document, Schema } from "mongoose";
import { ProductType } from "../product/product.types";
/*
export interface IProduct{
    _id?: Schema.Types.ObjectId;
    name: string;
    price: number;
    threshold: number;
    rewardPoints?: number;
}

export type ProductType = Document & IProduct;

*/

export interface IOrderRequest{
    shop_id : Schema.Types.ObjectId;
    quantity : Number;
    status : Number
    product_id: Schema.Types.ObjectId
}

export interface IOrder{
    shop_id : Schema.Types.ObjectId;
    items : IItem[];
    status : Number;
    product_id:Schema.Types.ObjectId
}

export interface IItem{
    product_id : Schema.Types.ObjectId;
    productName : String; 
    quantity : Number;
}
export type OrderType = Document & IOrder
export type IOrderRequestType = Document & IOrderRequest