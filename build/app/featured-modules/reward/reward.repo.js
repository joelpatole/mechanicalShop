"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const reward_schema_1 = require("./reward.schema");
const constant_1 = require("../../utility/constant");
const create = (reward) => reward_schema_1.RewardModel.create(reward);
const findOne = (filterParam) => reward_schema_1.RewardModel.findOne(filterParam);
const getEligibleRewards = (rewardPoints, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const dataPerPage = constant_1.Paggination.count;
    const initialGiftsArray = yield reward_schema_1.RewardModel.aggregate([
        {
            $match: {
                rewardPoints: { $lt: rewardPoints }
            }
        },
        { $skip: Number(pageNumber) * dataPerPage },
        { $limit: dataPerPage },
        { $sort: { rewardPoints: 1 } }
    ]);
    const firstGiftAboveRewardPoints = yield reward_schema_1.RewardModel.aggregate([
        { $sort: { rewardPoints: 1 } },
        { $match: { rewardPoints: { $gt: rewardPoints } } },
        { $limit: 1 }
    ]);
    const result = { initialGiftsArray, firstGiftAboveRewardPoints };
    return result;
});
exports.default = {
    create,
    findOne,
    getEligibleRewards,
};
//# sourceMappingURL=reward.repo.js.map