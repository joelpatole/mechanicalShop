"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_ID_VALIDATOR = exports.ORDER_PRODUCT_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.ORDER_PRODUCT_VALIDATOR = [
    (0, express_validator_1.body)("shop_id").exists().withMessage("shop_id is required"),
    (0, express_validator_1.body)("items").exists().withMessage("items is required"),
    validate_1.validate
];
exports.ORDER_ID_VALIDATOR = [
    (0, express_validator_1.param)("order_id").exists().withMessage("order_id is required").isMongoId().withMessage("id is not valid"),
    validate_1.validate
];
//# sourceMappingURL=order.validation.js.map