import {body} from "express-validator";
import {validate} from "../utility/validate"

export const ADMIN_REGISTRATION_VALIDATOR = [
    body("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    body("password").exists().withMessage("password is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    validate
]

export const SHOP_REGISTRATION_VALIDATOR = [
    body("name").exists().withMessage("name is required"),
    body("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    body("password").exists().withMessage("password is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    body("contact").exists().withMessage("contact is required"),
    body("address").exists().withMessage("address is required"),
    body("location").exists().withMessage("location is required"),
    validate
]

export const LOGIN_VALIDATION = [
    body("email").exists().withMessage("email is required").isEmail().withMessage("email sould be a valid email"),
    body("password").exists().withMessage("password is required").isLength({min : 3}).withMessage("length should be atleast 3"),
    validate
]