"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPROVE_SALES_REQUEST_VALIDATOR = exports.REGISTER_SALES_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.REGISTER_SALES_VALIDATOR = [
    (0, express_validator_1.body)("shop_id").exists().withMessage("shop_id is required"),
    (0, express_validator_1.body)("items").exists().withMessage("items is required"),
    validate_1.validate
];
exports.APPROVE_SALES_REQUEST_VALIDATOR = [
    (0, express_validator_1.body)("status").exists().withMessage("status is required"),
    validate_1.validate
];
//# sourceMappingURL=sales-request.validations.js.map