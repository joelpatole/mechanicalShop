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
const rating_schema_1 = require("./rating.schema");
const getShopRatingObject = (shop_id) => __awaiter(void 0, void 0, void 0, function* () {
    const shopRatingObject = yield rating_schema_1.RatingModel.find({ shop_id: shop_id });
    return shopRatingObject;
});
const rateAShop = (shop_id, averageRating, ratingArray) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rating_schema_1.RatingModel.create({ shop_id: shop_id, averageRating: averageRating, ratingArray: ratingArray });
    return result;
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside rating repo");
    console.log(data);
    const result = yield rating_schema_1.RatingModel.updateMany(filter, data);
    console.log("exit repo");
    console.log(result);
    return result;
});
const find = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rating_schema_1.RatingModel.find(Object.assign({}, filter));
    return result;
});
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rating_schema_1.RatingModel.findOne({ shop_id: filter });
    return result;
});
exports.default = {
    rateAShop,
    getShopRatingObject,
    update,
    find,
    findOne
};
//# sourceMappingURL=rating.repo.js.map