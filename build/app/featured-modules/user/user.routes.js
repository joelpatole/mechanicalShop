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
const user_services_1 = __importDefault(require("./user.services"));
const response_handler_1 = require("../../utility/response.handler");
const shop_service_1 = __importDefault(require("../shop/shop.service"));
const authorize_1 = require("../../utility/authorize");
const constant_1 = require("../../utility/constant");
const user_responses_1 = require("./user.responses");
const router = (0, express_1.Router)();
router.get("/get-admin-dashboard", (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const heighestRatedShop = yield shop_service_1.default.getShopByRatings(1);
        const lowestRatedShop = yield shop_service_1.default.getShopByRatings(-1);
        const result = ([heighestRatedShop, lowestRatedShop]);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/get-owner-dashboard/:owner_id", (0, authorize_1.permit)([constant_1.roles.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const owner_id = Object(req.params.owner_id);
        const shop = yield shop_service_1.default.find({ owner_id });
        if (shop !== null || shop !== undefined) {
            const ownerDashboardResult = yield user_services_1.default.getDetialsOfShop(shop[0]);
            res.send(new response_handler_1.ResponseHandler(ownerDashboardResult));
        }
        else {
            throw user_responses_1.USER_RESPONSES.COULD_NOT_FETCH;
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=user.routes.js.map