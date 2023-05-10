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
const shop_repo_1 = __importDefault(require("./shop.repo"));
const user_services_1 = __importDefault(require("../user/user.services"));
const bcryptjs_1 = require("bcryptjs");
const redeem_request_services_1 = __importDefault(require("../redeem-request/redeem-request.services"));
const encryptPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(10);
    const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, salt);
    user.password = hashedPassword;
    return user;
});
const find = (filter) => {
    return shop_repo_1.default.find(filter);
};
const findAll = (filter, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return yield shop_repo_1.default.findAll(filter, pageNumber);
});
const findById = (filter) => {
    console.log(`shop_id in shop service is `, filter);
    return shop_repo_1.default.findOne(filter);
};
const getTopShops = (queryType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield shop_repo_1.default.getTopShops(queryType);
});
const createShop = (shop, owner) => __awaiter(void 0, void 0, void 0, function* () {
    owner = yield encryptPassword(owner);
    const createdOwner = yield user_services_1.default.create(owner);
    shop.owner_id = createdOwner._id;
    return yield shop_repo_1.default.createShop(shop);
});
const updateShopInventory = (shop_id, product_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(`!!!!!!!!!!!!!!!!${shop_id}`);
    const shop = yield shop_repo_1.default.findOne(shop_id);
    console.log(`shop in shopServices is ${shop}`);
    console.log(`inventory len in shopServices is ${(_a = shop === null || shop === void 0 ? void 0 : shop.inventory) === null || _a === void 0 ? void 0 : _a.length}`);
    const a = (_b = shop === null || shop === void 0 ? void 0 : shop.inventory) === null || _b === void 0 ? void 0 : _b.length;
    let inventoryPresent = false;
    let result;
    if ((shop === null || shop === void 0 ? void 0 : shop.inventory) !== undefined) {
        if (shop.inventory.length > 0) {
            for (let i = 0; i < shop.inventory.length; i++) {
                const temp = "" + shop.inventory[i].productId + "";
                const temp2 = "" + product_id;
                if (temp === temp2) {
                    shop.inventory[i].quantity =
                        shop.inventory[i].quantity + Number(quantity); // converts Number to number
                    console.log(`new quantity is ${shop.inventory[i].quantity}`);
                    inventoryPresent = true;
                    break;
                }
            }
            if (!inventoryPresent) {
                shop === null || shop === void 0 ? void 0 : shop.inventory.push({
                    productId: product_id,
                    quantity: Number(quantity),
                }); //converts number to Number
                //result = await shopRepo.updateShopInventory(shop_id, shop.inventory)
            }
            console.log(`new inventory in shopServices is ${shop.inventory}`);
            result = yield shop_repo_1.default.updateShopInventory(shop_id, shop.inventory);
            //return result;
        }
        else {
            shop === null || shop === void 0 ? void 0 : shop.inventory.push({
                productId: product_id,
                quantity: Number(quantity),
            }); //converts number to Number
            result = yield shop_repo_1.default.updateShopInventory(shop_id, shop.inventory);
        }
    }
    return result;
});
const getShopByRatings = (sortBy) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_repo_1.default.getShopBasedOnRating(sortBy);
    return result;
});
const update = (shop_id, value) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('key is', value.key);
    console.log('value is ', value);
    const key = Object.keys(value);
    console.log("key is,", key);
    console.log("reward points i.e value in shopservice is, ", value);
    if (key[0] === 'rating') {
        const result = yield shop_repo_1.default.update({ _id: shop_id }, [{ $set: value }]);
        return result;
    }
    const result = yield shop_repo_1.default.update({ _id: shop_id }, { $inc: value });
    return result;
});
const updateQuantity = (shop_id, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shop_repo_1.default.update({ _id: shop_id, 'inventory.productId': productId }, { $inc: { 'inventory.$.quantity': quantity } });
    console.log(result);
    return result;
});
const seeGiftHistory = (shop_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("shop service");
    const result = yield redeem_request_services_1.default.seeGiftHistory(shop_id);
    console.log("result in shop services,", result);
    return result;
});
exports.default = {
    find,
    findById,
    findAll,
    getTopShops,
    createShop,
    updateShopInventory,
    seeGiftHistory,
    updateQuantity,
    update,
    getShopByRatings
};
//# sourceMappingURL=shop.service.js.map