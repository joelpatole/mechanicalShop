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
const product_repo_1 = __importDefault(require("./product.repo"));
const find = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repo_1.default.find(filter);
});
const findById = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repo_1.default.findById(product_id);
});
const addProducts = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repo_1.default.addProducts(product);
});
const extractAllProductsFromShopInventory = (inventoryArray) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inventory arry in product.service.ts extractAllProductsFromShopInventory");
    console.log(inventoryArray);
    let finalProductArray = [];
    if (inventoryArray.length < 1) {
        return finalProductArray;
    }
    else {
        for (let i = 0; i < inventoryArray.length; i++) {
            let singleProduct = yield product_repo_1.default.findById(inventoryArray[i].productId);
            console.log("single product is ", singleProduct);
            finalProductArray.push({
                product_id: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct._id,
                name: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.name,
                price: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.price,
                rewardPoints: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.rewardPoints,
                threshold: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.threshold,
                quantity: inventoryArray[i].quantity,
            });
        }
    }
    console.log("final Product array is, ", finalProductArray);
    return finalProductArray;
});
const getProductDetialsOfShop = (shop) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('shop in product services');
    let finalProductArray = [];
    let result = {
        shopId: shop._id,
        Name: shop.name,
        rewardPoints: shop.rewardPoints,
        shopRevenu: shop.shopRevenu,
        shopBranch: shop.location,
        shopAddress: shop.address,
        shopInventory: finalProductArray,
    };
    if ((shop === null || shop === void 0 ? void 0 : shop.inventory) !== undefined && (shop === null || shop === void 0 ? void 0 : shop.inventory.length) !== 0) {
        finalProductArray = yield extractAllProductsFromShopInventory(shop === null || shop === void 0 ? void 0 : shop.inventory);
        console.log("final Product array is, ", finalProductArray);
        result.shopInventory = finalProductArray;
        return result;
    }
    else {
        return result;
    }
});
exports.default = {
    find,
    findById,
    addProducts,
    extractAllProductsFromShopInventory,
    getProductDetialsOfShop,
};
//# sourceMappingURL=product.services.js.map