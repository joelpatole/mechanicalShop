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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reward_repo_1 = __importDefault(require("./reward.repo"));
const reward_responses_1 = require("./reward.responses");
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const redeem_request_services_1 = __importDefault(require("../redeem-request/redeem-request.services"));
const create = (reward) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = reward;
    const oldReward = yield reward_repo_1.default.findOne({ name: name });
    if (oldReward)
        throw reward_responses_1.REWARD_RESPONSES.ALREADY_EXISTS;
    return yield reward_repo_1.default.create(reward);
});
const findOne = (_id) => __awaiter(void 0, void 0, void 0, function* () { return yield reward_repo_1.default.findOne({ _id: _id }); });
const getEligibleRewards = (shop_id, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_service_1.default.findById(shop_id);
    console.log("shop is, ", shop);
    if (shop) {
        const result = yield reward_repo_1.default.getEligibleRewards(Number(shop.rewardPoints), pageNumber);
        const pointsRequired = Number(result.firstGiftAboveRewardPoints[0].rewardPoints) - Number(shop.rewardPoints);
        const finalResult = {
            eligibleGifts: result.initialGiftsArray,
            GiftAboveRewardPoint: result.firstGiftAboveRewardPoints,
            ExtraPointsRequired: pointsRequired,
        };
        return finalResult;
    }
    throw reward_responses_1.REWARD_RESPONSES.NOT_FOUND;
});
const orderGift = (giftOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redeem_request_services_1.default.orderGifts(giftOrder);
    return result;
});
exports.default = {
    create,
    findOne,
    getEligibleRewards,
    orderGift,
};
//# sourceMappingURL=reward.services.js.map