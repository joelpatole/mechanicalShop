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
const enumUtil_1 = require("../../utility/enumUtil");
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const redeem_request_repo_1 = __importDefault(require("./redeem-request.repo"));
const findAll = (filter, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const filterKeys = Object.keys(filter);
    console.log(filter);
    console.log(filterKeys);
    for (let key of filterKeys) {
        if (key.includes('status')) {
            const numericStatusValue = enumUtil_1.orderStatusHelper.convertStringToEnumValue(filter.status);
            const result = yield redeem_request_repo_1.default.findAll({ status: numericStatusValue }, pageNumber);
            return result;
        }
    }
    const result = yield redeem_request_repo_1.default.findAll(filter, pageNumber);
    return result;
});
const orderGifts = (giftOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_service_1.default.findById(Object(giftOrder.shop_id));
    let finalResult = {};
    if (shop) {
        giftOrder.shopAddress = shop.address;
        giftOrder.shopOwner = shop.name;
    }
    const result = yield redeem_request_repo_1.default.orderGifts(giftOrder);
    if (result && result.status) {
        finalResult = {
            redeemeReques_id: result._id,
            giftName: result.name,
            rewardPoints: result.rewardPoints,
            shop_id: result.shop_id,
            shopOwner: result.shopOwner,
            shopAddress: result.shopAddress,
            status: enumUtil_1.orderStatusHelper.convertEnumValueToString(result.status),
        };
    }
    return finalResult;
});
const seeGiftHistory = (shop_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello World service");
    const result = yield redeem_request_repo_1.default.seeGiftHistory(shop_id);
    console.log("result in redeme request Service is ", result);
    return result;
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const dataKeys = Object.keys(data);
    for (let key of dataKeys) {
        if (key.includes('status')) {
            const numericStatusValue = enumUtil_1.orderStatusHelper.convertStringToEnumValue(data.status);
            yield redeem_request_repo_1.default.update(filter, { status: numericStatusValue });
            const redeemRequestObject = yield redeem_request_repo_1.default.findById(filter._id);
            if (redeemRequestObject) {
                const shop = yield shop_service_1.default.findById(Object(redeemRequestObject.shop_id));
                const newRewardPoints = Number(redeemRequestObject === null || redeemRequestObject === void 0 ? void 0 : redeemRequestObject.rewardPoints) * -1;
                const result = yield shop_service_1.default.update(Object(shop === null || shop === void 0 ? void 0 : shop._id), { rewardPoints: newRewardPoints });
                return result;
            }
        }
        const result = yield redeem_request_repo_1.default.update(filter, data);
        return result;
    }
});
exports.default = {
    orderGifts,
    seeGiftHistory,
    findAll,
    update
};
//# sourceMappingURL=redeem-request.services.js.map