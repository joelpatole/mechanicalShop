import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_PRODUCT_VALIDATOR = [
    body("name").exists().withMessage("name is required"),
    body("price").exists().withMessage("price is required"),
    body("threshold").exists().withMessage("threshold is required"),
    body("rewardPoints").exists().withMessage("rewardPoints is required"),
    validate
]

