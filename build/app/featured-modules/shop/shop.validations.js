"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RATE_SHOP_VALIDATOT = exports.GET_TOP_10_SHOPS_VALIDATOR = exports.SHOP_ID_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.SHOP_ID_VALIDATOR = [
    (0, express_validator_1.param)("shop_id").exists().withMessage("shop id is required").isMongoId(),
    validate_1.validate
];
exports.GET_TOP_10_SHOPS_VALIDATOR = [
    (0, express_validator_1.param)("queryType").exists().withMessage("query is required"),
    validate_1.validate
];
exports.RATE_SHOP_VALIDATOT = [
    (0, express_validator_1.body)("shop_id").exists().withMessage("shop_id is required"),
    (0, express_validator_1.body)("rating").exists().withMessage("rating is required"),
    validate_1.validate
];
//# sourceMappingURL=shop.validations.js.map