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
const response_handler_1 = require("../../utility/response.handler");
const shop_service_1 = __importDefault(require("./shop.service"));
const constant_1 = require("../../utility/constant");
const authorize_1 = require("../../utility/authorize");
const product_services_1 = __importDefault(require("../product/product.services"));
const shop_responses_1 = require("./shop.responses");
const shop_validations_1 = require("./shop.validations");
const rating_service_1 = __importDefault(require("../review/rating.service"));
const router = (0, express_1.Router)();
router.get("/see-all-shops", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page } = _a, rest = __rest(_a, ["page"]);
        const pageNumber = page;
        console.log("page number is ", page);
        console.log("rest is ", rest);
        const result = yield shop_service_1.default.findAll(rest, Number(pageNumber));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/get-top-shops/:queryType", (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryType = req.params.queryType;
        const result = yield shop_service_1.default.getTopShops(queryType);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.post("/create-shop", (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = constant_1.roles.OWNER;
        const _b = req.body, { name, email, password } = _b, shop = __rest(_b, ["name", "email", "password"]);
        const result = yield shop_service_1.default.createShop(Object.assign({ name, email }, shop), { name, email, password, role });
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/see-all-shops", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _c = req.query, { page } = _c, rest = __rest(_c, ["page"]);
        const result = yield shop_service_1.default.findAll(rest, Number(page));
        if (!result)
            throw shop_responses_1.SHOP_RESPONSE.SHOP_NOT_FOUND;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/get-a-shop/:shop_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop_id = Object(req.params.shop_id);
        console.log(shop_id);
        let result;
        if (req.params.shop_id) {
            const shop = yield shop_service_1.default.findById(shop_id);
            if ((shop === null || shop === void 0 ? void 0 : shop.inventory) != undefined) {
                result = yield product_services_1.default.getProductDetialsOfShop(shop);
                res.send(new response_handler_1.ResponseHandler(result));
            }
        }
        else {
            throw shop_responses_1.SHOP_RESPONSE.SHOP_NOT_FOUND;
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post("/rate-a-shop", shop_validations_1.RATE_SHOP_VALIDATOT, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop_id = req.body.shop_id;
        const rating = req.body.rating;
        const result = yield rating_service_1.default.rateAShop(shop_id, rating);
        if (!result)
            throw shop_responses_1.SHOP_RESPONSE.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
    }
}));
router.get("/see-gift-history/:shop_id", (0, authorize_1.permit)([constant_1.roles.ADMIN, constant_1.roles.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shop_id } = req.params;
        console.log(shop_id);
        const result = yield shop_service_1.default.seeGiftHistory(Object(shop_id));
        if (!result)
            throw shop_responses_1.SHOP_RESPONSE.SHOP_NOT_FOUND;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=shop.routes.js.map