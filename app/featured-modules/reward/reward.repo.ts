import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { IReward } from "./reward.types";
import { RewardModel } from "./reward.schema";
import { Paggination } from "../../utility/constant";
import { RedeemRequestModel } from "../redeem-request/redeem-request.schema";

const create = (reward: IReward) => RewardModel.create(reward);


const findOne = (filterParam: FilterQuery<IReward>) => RewardModel.findOne(filterParam)

const getEligibleRewards = async(rewardPoints : Number, pageNumber : Number)=>{
   const dataPerPage = Paggination.count
   const initialGiftsArray = await RewardModel.aggregate([
    { 
        $match:{
            rewardPoints : {$lt : rewardPoints}  
        }
    },
    {$skip : Number(pageNumber) * dataPerPage},
    {$limit : dataPerPage},
    {$sort : {rewardPoints : 1}}

   ]) 
   const firstGiftAboveRewardPoints = await RewardModel.aggregate([
    { $sort : { rewardPoints : 1}},
    { $match :{rewardPoints : { $gt : rewardPoints} }},
    {$limit : 1}
   ])

   const result = {initialGiftsArray, firstGiftAboveRewardPoints}
   return result;
}

export default{
    create,
    findOne,
    getEligibleRewards,
}