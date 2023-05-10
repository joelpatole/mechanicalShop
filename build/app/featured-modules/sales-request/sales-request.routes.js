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
const express_1 = require("express");
const sales_request_service_1 = __importDefault(require("./sales-request.service"));
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const response_handler_1 = require("../../utility/response.handler");
const constant_1 = require("../../utility/constant");
const authorize_1 = require("../../utility/authorize");
const shop_responses_1 = require("../shop/shop.responses");
const sales_request_validations_1 = require("./sales-request.validations");
const router = (0, express_1.Router)();
router.post("/register-sales", (0, authorize_1.permit)([constant_1.roles.OWNER]), sales_request_validations_1.REGISTER_SALES_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shop_id } = req.body;
        const { items } = req.body;
        const result = yield sales_request_service_1.default.registerSales(shop_id, items);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
//this route will send the shop details to the FrontEnd
//afert which UI team will control the data that will go to register-sales route
router.get("/shop-inventory/:shop_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop = yield shop_service_1.default.findById(Object(req.params.shop_id));
        if (shop !== null) {
            const result = yield sales_request_service_1.default.getProductDetialsOfShop(shop);
            res.send(new response_handler_1.ResponseHandler(result));
        }
        else {
            throw shop_responses_1.SHOP_RESPONSE.SHOP_NOT_FOUND;
        }
    }
    catch (err) {
        next(err);
    }
}));
router.get("/show-sales-request", (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestStatus = req.query["status"];
        const pageNumber = req.query["page"];
        if (requestStatus) {
            const result = yield sales_request_service_1.default.getSalesRequest(String(requestStatus), Number(pageNumber));
            if (result) {
                res.send(new response_handler_1.ResponseHandler(result));
            }
            else {
                throw SALES_REQUEST.COULD_NOT_FIND_DATA;
            }
        }
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/approve-sales-request/:sales_request_id", (0, authorize_1.permit)([constant_1.roles.ADMIN]), sales_request_validations_1.APPROVE_SALES_REQUEST_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales_request_id = req.params.sales_request_id;
        const status = req.body.status;
        const result = yield sales_request_service_1.default.updateSalesRequestStatus(sales_request_id, status);
        if (!result)
            throw SALES_REQUEST.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=sales-request.routes.js.map