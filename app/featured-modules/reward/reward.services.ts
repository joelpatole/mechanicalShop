import { FilterQuery, Schema } from "mongoose";
import rewardRepo from "./reward.repo";
import { REWARD_RESPONSES } from "./reward.responses";
import { IReward } from "./reward.types";
import shopService from "../shop/shop.service";
import redeemRequestServices from "../redeem-request/redeem-request.services";
import { IRedeemRequest } from "../redeem-request/redeem-request.types";
import { orderStatusHelper } from "../../utility/enumUtil";

const create = async (reward: IReward) => {
  const { name } = reward;
  const oldReward = await rewardRepo.findOne({ name: name });
  if (oldReward) throw REWARD_RESPONSES.ALREADY_EXISTS;
  return await rewardRepo.create(reward);
};

const findOne = async (_id: string) => await rewardRepo.findOne({ _id: _id });





const getEligibleRewards = async (
  shop_id: Schema.Types.ObjectId,
  pageNumber: Number
) => {
  const shop = await shopService.findById(shop_id);
  console.log("shop is, ", shop);
  if (shop) {
    const result = await rewardRepo.getEligibleRewards(
      Number(shop.rewardPoints),
      pageNumber
    );
    const pointsRequired =
      Number(result.firstGiftAboveRewardPoints[0].rewardPoints) - Number(shop.rewardPoints);

    const finalResult = {
      eligibleGifts: result.initialGiftsArray,
      GiftAboveRewardPoint: result.firstGiftAboveRewardPoints,
      ExtraPointsRequired: pointsRequired,
    };
    return finalResult;
  }
  throw REWARD_RESPONSES.NOT_FOUND;
};

const orderGift = async (giftOrder: IRedeemRequest) => {
  const result = await redeemRequestServices.orderGifts(giftOrder);
  return result;
};
export default {
  create,
  findOne,
  getEligibleRewards,
  orderGift,
};
