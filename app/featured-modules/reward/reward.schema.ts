import { BaseSchema } from "../../utility/base.schema";
import { IReward } from "./reward.types";
import { model } from "mongoose";

const RewardSchema = new BaseSchema({
    name: {
        type: String,
        required: true
    },
    rewardPoints: {
        type: Number,
        required: true,
        default: 0
    }
})
type RewardDocument = Document & IReward;

export const RewardModel = model<RewardDocument>("reward", RewardSchema)
