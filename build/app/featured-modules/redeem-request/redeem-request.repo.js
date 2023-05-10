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
const redeem_request_schema_1 = require("./redeem-request.schema");
const constant_1 = require("../../utility/constant");
const orderGifts = (giftOrder) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("giftOrder is,", giftOrder);
    const result = yield redeem_request_schema_1.RedeemRequestModel.create(giftOrder);
    return result;
});
const seeGiftHistory = (shop_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redeem_request_schema_1.RedeemRequestModel.find({ shop_id });
    return result;
});
const findAll = (filter, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filter);
    const dataPerPage = constant_1.Paggination.count;
    const result = yield redeem_request_schema_1.RedeemRequestModel.find(Object.assign({ isDeleted: false }, filter)).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage).sort({ 'createdAt': -1 });
    return result;
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redeem_request_schema_1.RedeemRequestModel.updateMany(Object.assign({ isDeleted: false }, filter), data);
    return result;
});
const findById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield redeem_request_schema_1.RedeemRequestModel.findById(_id);
    return result;
});
exports.default = {
    orderGifts,
    seeGiftHistory,
    findAll,
    update,
    findById
};
//# sourceMappingURL=redeem-request.repo.js.map