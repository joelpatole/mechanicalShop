"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_GIFT_VALIDATION = exports.ADD_REWARD_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_REWARD_VALIDATOR = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required"),
    (0, express_validator_1.body)("rewardPoints").exists().withMessage("rewardPoints is required"),
    validate_1.validate
];
exports.REQUEST_GIFT_VALIDATION = [
    (0, express_validator_1.body)("giftOrder").exists().withMessage("gift Object is required"),
    validate_1.validate
];
//# sourceMappingURL=reward.validation.js.map