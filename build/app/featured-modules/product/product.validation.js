"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_PRODUCT_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ADD_PRODUCT_VALIDATOR = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required"),
    (0, express_validator_1.body)("price").exists().withMessage("price is required"),
    (0, express_validator_1.body)("threshold").exists().withMessage("threshold is required"),
    (0, express_validator_1.body)("rewardPoints").exists().withMessage("rewardPoints is required"),
    validate_1.validate
];
//# sourceMappingURL=product.validation.js.map