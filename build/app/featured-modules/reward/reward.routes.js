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
const reward_services_1 = __importDefault(require("./reward.services"));
const reward_responses_1 = require("./reward.responses");
const response_handler_1 = require("../../utility/response.handler");
const authorize_1 = require("../../utility/authorize");
const constant_1 = require("../../utility/constant");
const reward_validation_1 = require("./reward.validation");
const router = (0, express_1.Router)();
router.post('/add-new-gift', (0, authorize_1.permit)([constant_1.roles.ADMIN]), reward_validation_1.ADD_REWARD_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gift = req.body;
        const result = yield reward_services_1.default.create(gift);
        if (!result)
            throw reward_responses_1.REWARD_RESPONSES.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/see-eligible-rewards/:shop_id", (0, authorize_1.permit)([constant_1.roles.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop_id = req.params.shop_id;
        const { page } = req.query;
        const result = yield reward_services_1.default.getEligibleRewards(Object(shop_id), Number(page));
        if (!result)
            throw reward_responses_1.REWARD_RESPONSES.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.post("/order-gift", (0, authorize_1.permit)([constant_1.roles.OWNER]), reward_validation_1.REQUEST_GIFT_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const giftOrder = req.body.giftOrder;
        console.log("gift Order is ", giftOrder);
        const result = yield reward_services_1.default.orderGift(giftOrder);
        if (!result)
            throw reward_responses_1.REWARD_RESPONSES.SOMETHING_WENT_WRONG;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=reward.routes.js.map