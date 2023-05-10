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
const user_repo_1 = __importDefault(require("./user.repo"));
const constant_1 = require("../../utility/constant");
const user_responses_1 = require("./user.responses");
const product_services_1 = __importDefault(require("../product/product.services"));
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const find = (filter) => user_repo_1.default.find(Object.assign({ role: constant_1.roles.OWNER }, filter));
const findOne = (filter) => user_repo_1.default.findOne(filter);
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_repo_1.default.findOne({ email: user.email });
        if (existingUser)
            throw user_responses_1.USER_RESPONSES.USER_ALREADY_EXIST;
        return user_repo_1.default.create(user);
    }
    catch (err) {
        throw err;
    }
});
const update = (filter, data) => user_repo_1.default.update(filter, data);
const getDetialsOfShop = (shop) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_services_1.default.getProductDetialsOfShop(shop);
    return result;
});
const getAllShops = (filter, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const allShops = yield shop_service_1.default.findAll(filter, pageNumber);
    let finalResult = [];
    for (let singleShop of allShops) {
        finalResult.push({ shop_id: singleShop._id,
            Name: singleShop.name,
            contact: singleShop.contact,
            email: singleShop.email,
            address: singleShop.address,
            location: singleShop.location,
            rating: singleShop.rating
        });
    }
    console.log(finalResult);
    return finalResult;
});
const getAShop = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_service_1.default.find(filter);
    const finalResult = {
        shop_id: shop[0]._id,
        Name: shop[0].name,
        contact: shop[0].contact,
        email: shop[0].email,
        address: shop[0].address,
        location: shop[0].location,
        rating: shop[0].rating
    };
    return finalResult;
});
// const rateAShop = async(shop_id:Schema.Types.ObjectId,rating : Number)=>{
//     console.log("inside userServices")
//     const result = await ratingService.rateAShop(shop_id,rating);
//     return result;
// }
exports.default = {
    find,
    findOne,
    create,
    update,
    getDetialsOfShop,
    getAllShops,
    getAShop
};
//# sourceMappingURL=user.services.js.map