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
const sales_request_schema_1 = require("./sales-request.schema");
const constant_1 = require("../../utility/constant");
const createSalesRequest = (salesRequestObject) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_request_schema_1.salesRequestModel.create(salesRequestObject);
    return result;
});
// const dataPerPage = Paggination.count
// return await orderModel.find({status:reqStatus, ...filter}).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage); 
const getSalesRequest = (status, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const dataPerPage = constant_1.Paggination.count;
    const result = yield sales_request_schema_1.salesRequestModel.find({ status: status }).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage);
    return result;
});
const updateSalesRequestStatus = (_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield sales_request_schema_1.salesRequestModel.findByIdAndUpdate({ _id: _id }, { status: status });
    const result = yield sales_request_schema_1.salesRequestModel.findById(_id);
    return result;
});
exports.default = {
    createSalesRequest,
    getSalesRequest,
    updateSalesRequestStatus
};
//# sourceMappingURL=sales-request.repo.js.map