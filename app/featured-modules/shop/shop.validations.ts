import { body, param } from "express-validator";
import { validate } from "../../utility/validate";


export const SHOP_ID_VALIDATOR = [
    param("shop_id").exists().withMessage("shop id is required").isMongoId(),
    validate
]

export const GET_TOP_10_SHOPS_VALIDATOR = [
    param("queryType").exists().withMessage("query is required"),
    validate
]

export const RATE_SHOP_VALIDATOT = [
    body("shop_id").exists().withMessage("shop_id is required"),
    body("rating").exists().withMessage("rating is required"),
    validate
]
