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
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const rating_repo_1 = __importDefault(require("./rating.repo"));
const rateAShop = (shop_id, rating) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside rating services");
    //push into the array
    // search if doc exists
    const shopRatngRecord = yield rating_repo_1.default.findOne(shop_id);
    console.log(shopRatngRecord);
    if (shopRatngRecord) {
        const array = shopRatngRecord.ratingArray;
        array.push(rating);
        yield rating_repo_1.default.update({ shop_id: shop_id }, { ratingArray: array });
        yield rating_repo_1.default.update({ shop_id: shop_id }, [{ $set: { averageRating: { $avg: "$ratingArray" } },
            }]);
        const result = yield rating_repo_1.default.findOne(shop_id);
        if (result === null || result === void 0 ? void 0 : result.averageRating) {
            yield shop_service_1.default.update(shop_id, { rating: result === null || result === void 0 ? void 0 : result.averageRating });
            return result;
        }
    }
    else {
        const ratingArray = [rating];
        yield rating_repo_1.default.rateAShop(shop_id, rating, ratingArray);
        yield shop_service_1.default.update(shop_id, { rating: ratingArray[0] });
        const result = yield shop_service_1.default.findById(shop_id);
        return result;
    }
});
exports.default = {
    rateAShop,
};
//# sourceMappingURL=rating.service.js.map