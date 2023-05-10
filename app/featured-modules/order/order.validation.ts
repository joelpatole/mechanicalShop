import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const ORDER_PRODUCT_VALIDATOR = [
    body("shop_id").exists().withMessage("shop_id is required"),
    body("items").exists().withMessage("items is required"),
    validate
]

export const ORDER_ID_VALIDATOR = [
   param("order_id").exists().withMessage("order_id is required").isMongoId().withMessage("id is not valid"),
   validate
 ]
