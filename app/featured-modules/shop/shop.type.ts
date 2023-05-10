import { Schema } from "mongoose";

export interface IShop {
    _id?: Schema.Types.ObjectId;
    owner_id : Schema.Types.ObjectId;
    name: string;
    email: string;
    contact : string,
    address : string,
    location?: string;
    rewardPoints : string,
    shopRevenu : string,
    rating : number,
    inventory?: IInventory[];
}


export interface IInventory {
    _id?: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    quantity: number;
}

export type shopType = Document & IShop;