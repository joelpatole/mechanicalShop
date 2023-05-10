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
const order_repo_1 = __importDefault(require("./order.repo"));
const order_responses_1 = require("./order.responses");
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const enumUtil_1 = require("../../utility/enumUtil");
const create = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderList = [];
        for (let item of order.items) {
            console.log(item.productName);
            const product = yield product_services_1.default.find(item.product_id);
            const orderDetail = {
                product_id: item.product_id,
                quantity: item.quantity,
                status: order.status,
                shop_id: order.shop_id
            };
            const result = yield order_repo_1.default.create(orderDetail);
            if (!result)
                throw order_responses_1.OrderResponses.ORDER_NOT_REGISTERED;
            orderList.push(result);
        }
        return orderList;
    }
    catch (err) {
        throw err;
    }
});
const getAllOrdersByStatus = (reqStatus, filter, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const allOrders = await orderRepo.getAllOrders().populate("product_id");
        const res = [];
        //status pending
        const allOrders = yield order_repo_1.default.getAllOrders(reqStatus, filter, pageNumber);
        // console.log(allOrders);
        for (let i = 0; i < allOrders.length; i++) {
            const product = yield product_services_1.default.findById(allOrders[i].product_id);
            res.push({ order_id: allOrders[i]._id,
                product_id: product === null || product === void 0 ? void 0 : product._id,
                productName: product === null || product === void 0 ? void 0 : product.name,
                status: enumUtil_1.orderStatusHelper.convertEnumValueToString(allOrders[i].status),
                shop_id: allOrders[i].shop_id,
                quantity: allOrders[i].quantity });
        }
        return res;
    }
    catch (err) {
        throw err;
    }
});
const approveOrderRequest = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_repo_1.default.approveOrderRequest(order_id);
        console.log(`orer servoces`);
        console.log(`order result = ${result}`);
        if (!result || result.length == 0)
            throw order_responses_1.OrderResponses.ORDERS_NOT_FOUND;
        const { status, _id, shop_id, quantity, product_id } = result[0];
        const statusString = enumUtil_1.orderStatusHelper.convertEnumValueToString(status);
        const finalRestult = {
            _id, shop_id, quantity, product_id,
            status: statusString
        };
        if (!finalRestult)
            throw order_responses_1.OrderResponses.ORDERS_NOT_FOUND;
        console.log(`shop_id is ${result[0].shop_id}`);
        yield shop_service_1.default.updateShopInventory(result[0].shop_id, result[0].product_id, result[0].quantity);
        return finalRestult;
    }
    catch (err) {
        throw err;
    }
});
const deleteRequest = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_repo_1.default.deleteRequest({ _id: order_id, status: 1 }, [{ $set: { isDeleted: true } }]);
    return result;
});
exports.default = {
    create,
    getAllOrdersByStatus,
    approveOrderRequest,
    deleteRequest
};
//# sourceMappingURL=order.service.js.map