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
const product_schema_1 = require("./product.schema");
const find = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield product_schema_1.productModel.find(Object.assign({ isDeleted: false }, filter)); });
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield product_schema_1.productModel.findOne(Object.assign({ isDeleted: false }, filter)); });
const findById = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('product  id is ', product_id);
    const product = yield product_schema_1.productModel.findById({ _id: product_id });
    console.log("product is ", product);
    return product;
});
const addProducts = (product) => __awaiter(void 0, void 0, void 0, function* () { return yield product_schema_1.productModel.create(product); });
const update = (filter, data) => product_schema_1.productModel.updateMany(Object.assign({ isDeleted: false }, filter), data);
exports.default = {
    find,
    findOne,
    findById,
    addProducts,
    update
};
//# sourceMappingURL=product.repo.js.map