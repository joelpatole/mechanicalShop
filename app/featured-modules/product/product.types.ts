import { Document, Schema } from "mongoose";

export interface IProduct{
    _id?: Schema.Types.ObjectId;
    name: string;
    price: number;
    threshold: number;
    rewardPoints?: number;
}

export type ProductType = Document & IProduct;