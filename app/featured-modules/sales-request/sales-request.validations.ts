import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const REGISTER_SALES_VALIDATOR = [
    body("shop_id").exists().withMessage("shop_id is required"),
    body("items").exists().withMessage("items is required"),
    validate
]

export const APPROVE_SALES_REQUEST_VALIDATOR = [
    body("status").exists().withMessage("status is required"),
    validate
]