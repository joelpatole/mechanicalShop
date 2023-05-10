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
const shop_schema_1 = require("./shop.schema");
const constant_1 = require("../../utility/constant");
const findAll = (filter, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const dataPerPage = constant_1.Paggination.count;
    return yield shop_schema_1.shopModel.find(Object.assign({}, filter)).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage).sort({ 'rating': -1 });
});
const updateShopRating = (shop_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_schema_1.shopModel.updateOne({ _id: shop_id }, { $set: { ["data"]: data } });
});
const find = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield shop_schema_1.shopModel.find(Object.assign({ isDeleted: false }, filter));
});
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const restult = yield shop_schema_1.shopModel.findById(filter);
    return restult;
});
const findById = (shop_id) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_schema_1.shopModel.findById(shop_id);
    return shop;
});
const getTopShops = (queryType) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_schema_1.shopModel.aggregate([
        { $match: { [queryType]: { $gte: 0 } } },
        { $sort: { [queryType]: -1 } },
        { $limit: (10) }
    ]);
    console.log(result);
    return result;
});
const createShop = (shop) => __awaiter(void 0, void 0, void 0, function* () {
    return yield shop_schema_1.shopModel.create(shop);
});
const updateShopInventory = (shop_id, inventory) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`inventory is ${inventory}`);
    console.log(`shop_id in shop.repo is ${shop_id}`);
    const result = yield shop_schema_1.shopModel.findByIdAndUpdate({ _id: shop_id }, { inventory: inventory });
    console.log("&&&&&&&&&&&&&&&&&    ", result);
    return result;
});
const getShopBasedOnRating = (sortBy) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_schema_1.shopModel.aggregate([
        { $sort: { rating: sortBy } },
        { $limit: (1) }
    ]);
    return shop;
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside shop.repo.ts");
    console.log(data);
    const result = yield shop_schema_1.shopModel.updateMany(filter, data);
    console.log(result);
    return result;
});
exports.default = {
    find,
    findOne,
    getTopShops,
    createShop,
    findById,
    updateShopInventory,
    getShopBasedOnRating,
    findAll,
    updateShopRating,
    update
};
//# sourceMappingURL=shop.repo.js.map