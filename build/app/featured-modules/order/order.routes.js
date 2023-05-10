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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_service_1 = __importDefault(require("./order.service"));
const response_handler_1 = require("../../utility/response.handler");
const constant_1 = require("../../utility/constant");
const enumUtil_1 = require("../../utility/enumUtil");
const authorize_1 = require("../../utility/authorize");
const order_validation_1 = require("./order.validation");
const order_responses_1 = require("./order.responses");
const router = (0, express_1.Router)();
//middleware to check if owner
router.post('/order-items', (0, authorize_1.permit)([constant_1.roles.OWNER]), order_validation_1.ORDER_PRODUCT_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const result = yield order_service_1.default.create(order);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
//middleware to check if admin
router.get('/get-all-orders', (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const requestStatus = req.query['status'];
        const _a = req.query, { status, page } = _a, rest = __rest(_a, ["status", "page"]);
        console.log('status is ', status);
        console.log('rest is ', rest);
        const pageNumber = page;
        console.log("page is", pageNumber);
        // let orderStatus : status = status.unknown;
        //this is required because conveting query param string to enum value is 
        //not supported out of the box. String can be undefined when you get it
        //using req.quer['status'] and direct converstion is not allowed because of this 'undefined'
        //eg: var enumValue : status = (<any>status)[requestStatus] does not work;
        //One way to do it is by using below custom function.
        const orderStatusEnumValue = enumUtil_1.orderStatusHelper.convertStringToEnumValue(status);
        const result = yield order_service_1.default.getAllOrdersByStatus(orderStatusEnumValue, rest, Number(pageNumber));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch('/approve-order-request/:order_id', (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.order_id);
        const result = yield order_service_1.default.approveOrderRequest(req.params.order_id);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/delete-order-request/:order_id', (0, authorize_1.permit)([constant_1.roles.OWNER]), order_validation_1.ORDER_ID_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.order_id;
        const result = yield order_service_1.default.deleteRequest(Object(order_id));
        if (!result)
            throw order_responses_1.OrderResponses.CANNOT_DELETE_ORDER;
        res.send(new response_handler_1.ResponseHandler({ OrderDeleted: result }));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=order.routes.js.map