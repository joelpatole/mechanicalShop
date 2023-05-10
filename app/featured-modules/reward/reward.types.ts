import { Schema } from "mongoose";

export interface IReward{
    _id?: String | Schema.Types.ObjectId,
    name: String,
    rewardPoints: Number,
    status? : Number | String
}