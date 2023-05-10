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
const order_schema_1 = require("./order.schema");
const constant_1 = require("../../utility/constant");
const create = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_schema_1.orderModel.create(order);
});
const getAllOrders = (reqStatus, filter, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const dataPerPage = constant_1.Paggination.count;
    return yield order_schema_1.orderModel.find(Object.assign({ isDeleted: false, status: reqStatus }, filter)).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage);
});
const approveOrderRequest = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_schema_1.orderModel.findByIdAndUpdate({ _id: order_id }, { status: constant_1.status.approved });
    return yield order_schema_1.orderModel.find({ _id: order_id });
});
const deleteRequest = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filter);
    const result = yield order_schema_1.orderModel.findOneAndUpdate(filter, data);
    return result;
});
exports.default = {
    create,
    getAllOrders,
    approveOrderRequest,
    deleteRequest
};
//# sourceMappingURL=order.repo.js.map