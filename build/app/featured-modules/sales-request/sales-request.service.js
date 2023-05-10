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
const product_services_1 = __importDefault(require("../product/product.services"));
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const constant_1 = require("../../utility/constant");
const sales_request_repo_1 = __importDefault(require("./sales-request.repo"));
const enumUtil_1 = require("../../utility/enumUtil");
const getProductDetialsOfShop = (shop) => __awaiter(void 0, void 0, void 0, function* () {
    const result = product_services_1.default.getProductDetialsOfShop(shop);
    return result;
});
const registerSales = (shop_id, items) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield shop_service_1.default.findById(shop_id);
    let salesRequestObject = {};
    let items_sold = [];
    let totalRevenu = 0;
    let rewardPoints = 0;
    let totalRewardPoints = 0;
    if (shop !== undefined || shop !== null) {
        for (let i = 0; i < items.length; i++) {
            let singleProduct = yield product_services_1.default.findById(items[i].product_id);
            if (singleProduct !== undefined) {
                let total = Number(items[i].quantity) * Number(singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.price);
                totalRevenu = Number(totalRevenu) + Number(total);
                rewardPoints =
                    Number(rewardPoints) + Number(singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.rewardPoints);
                totalRewardPoints = Number(totalRewardPoints) + Number(rewardPoints);
                items_sold.push({
                    product_id: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct._id,
                    productName: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.name,
                    quantity: items[i].quantity,
                    price_per_product: singleProduct === null || singleProduct === void 0 ? void 0 : singleProduct.price,
                    total: total,
                    rewardPoints: rewardPoints,
                });
            }
        }
        salesRequestObject = {
            shop_id: shop === null || shop === void 0 ? void 0 : shop._id,
            items_sold: items_sold,
            totalRevenu: totalRevenu,
            totalRewardPoints: totalRewardPoints,
            status: constant_1.status.pending,
        };
        const result = yield sales_request_repo_1.default.createSalesRequest(salesRequestObject);
        return result;
    }
});
const getSalesRequest = (params, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const status = enumUtil_1.orderStatusHelper.convertStringToEnumValue(params);
    const result = yield sales_request_repo_1.default.getSalesRequest(status, pageNumber);
    return result;
});
const updateSalesRequestStatus = (_id, stringStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const statusValue = enumUtil_1.orderStatusHelper.convertStringToEnumValue(stringStatus);
    const salesRequest_id = Object(_id);
    const salesRequestResult = yield sales_request_repo_1.default.updateSalesRequestStatus(salesRequest_id, statusValue);
    if (statusValue == constant_1.status.approved) {
        if (salesRequestResult) {
            let finalRestult = {
                _id: salesRequestResult === null || salesRequestResult === void 0 ? void 0 : salesRequestResult.id,
                shop_id: salesRequestResult === null || salesRequestResult === void 0 ? void 0 : salesRequestResult.shop_id,
                items_sold: salesRequestResult === null || salesRequestResult === void 0 ? void 0 : salesRequestResult.items_sold,
                totalRevenu: salesRequestResult === null || salesRequestResult === void 0 ? void 0 : salesRequestResult.totalRevenu,
                totalRewardPoints: salesRequestResult === null || salesRequestResult === void 0 ? void 0 : salesRequestResult.totalRewardPoints,
                status: enumUtil_1.orderStatusHelper.convertEnumValueToString(salesRequestResult === null || salesRequestResult === void 0 ? void 0 : salesRequestResult.status),
            };
            const shop = yield shop_service_1.default.findById(salesRequestResult.shop_id);
            let shopInventory = shop === null || shop === void 0 ? void 0 : shop.inventory;
            if (shopInventory != undefined) {
                //update total reward and total revenu
                const rewardPoints = finalRestult.totalRewardPoints;
                const shopRevenu = finalRestult.totalRevenu;
                yield shop_service_1.default.update(salesRequestResult.shop_id, { rewardPoints: rewardPoints });
                yield shop_service_1.default.update(salesRequestResult.shop_id, { shopRevenu: shopRevenu });
                for (let eachProduct of salesRequestResult.items_sold) {
                    {
                        let newQuantity = Number(eachProduct.quantity) * -1;
                        const result = yield shop_service_1.default.updateQuantity(salesRequestResult.shop_id, eachProduct.product_id, newQuantity);
                    }
                }
            }
            return finalRestult;
        }
        else {
            throw SALES_REQUEST.SOMETHING_WENT_WRONG;
        }
    }
});
exports.default = {
    getProductDetialsOfShop,
    registerSales,
    getSalesRequest,
    updateSalesRequestStatus,
};
//# sourceMappingURL=sales-request.service.js.map