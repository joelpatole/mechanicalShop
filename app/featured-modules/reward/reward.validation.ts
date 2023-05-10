import { body } from "express-validator";
import { validate } from "../../utility/validate";

export const ADD_REWARD_VALIDATOR = [
    body("name").exists().withMessage("name is required"),
    body("rewardPoints").exists().withMessage("rewardPoints is required"),
    validate
]
export const REQUEST_GIFT_VALIDATION = [
    body("giftOrder").exists().withMessage("gift Object is required"),
    validate    
]
