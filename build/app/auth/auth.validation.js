"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN_VALIDATION = exports.SHOP_REGISTRATION_VALIDATOR = exports.ADMIN_REGISTRATION_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../utility/validate");
exports.ADMIN_REGISTRATION_VALIDATOR = [
    (0, express_validator_1.body)("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    (0, express_validator_1.body)("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    validate_1.validate
];
exports.SHOP_REGISTRATION_VALIDATOR = [
    (0, express_validator_1.body)("name").exists().withMessage("name is required"),
    (0, express_validator_1.body)("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    (0, express_validator_1.body)("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    (0, express_validator_1.body)("contact").exists().withMessage("contact is required"),
    (0, express_validator_1.body)("address").exists().withMessage("address is required"),
    (0, express_validator_1.body)("location").exists().withMessage("location is required"),
    validate_1.validate
];
exports.LOGIN_VALIDATION = [
    (0, express_validator_1.body)("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    (0, express_validator_1.body)("password").exists().withMessage("password is required").isLength({ min: 3 }).withMessage("length should be atleast 3"),
    validate_1.validate
];
//# sourceMappingURL=auth.validation.js.map