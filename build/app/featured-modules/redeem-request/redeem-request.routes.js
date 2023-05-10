"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constant_1 = require("../../utility/constant");
const authorize_1 = require("../../utility/authorize");
const redeem_request_services_1 = __importDefault(require("./redeem-request.services"));
const response_handler_1 = require("../../utility/response.handler");
const redeem_request_response_1 = require("./redeem-request.response");
const router = (0, express_1.Router)();
router.get("/get-redeem-requests", (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page } = _a, rest = __rest(_a, ["page"]);
        const pageNumber = page;
        const filter = rest;
        console.log(filter);
        const result = yield redeem_request_services_1.default.findAll(filter, Number(pageNumber));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/approve-redeem-request/:_id", (0, authorize_1.permit)([constant_1.roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.params;
        const data = req.body;
        const result = yield redeem_request_services_1.default.update(filter, data);
        if (!result)
            throw redeem_request_response_1.REDEEM_REQUEST_RESPONSE.COULD_NOT_PERFORM_ACTION;
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
    }
}));
exports.default = router;
//# sourceMappingURL=redeem-request.routes.js.map