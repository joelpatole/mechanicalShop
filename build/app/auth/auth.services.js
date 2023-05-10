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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const user_services_1 = __importDefault(require("../featured-modules/user/user.services"));
const auth_responses_1 = require("./auth.responses");
const key_generate_1 = require("../utility/key.generate");
const jsonwebtoken_1 = require("jsonwebtoken");
const role_services_1 = __importDefault(require("../featured-modules/role/role.services"));
const encryptPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(10);
    const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, salt);
    user.password = hashedPassword;
    return user;
});
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user = yield encryptPassword(user);
    const result = user_services_1.default.create(user);
    return result;
});
const login = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.default.findOne({ email: credentials.email });
    const role = yield role_services_1.default.findOne(user === null || user === void 0 ? void 0 : user.role);
    console.log(user);
    if (!user)
        throw auth_responses_1.AuthResponses.USER_NOT_FOUND;
    const isPasswordMatched = yield (0, bcryptjs_1.compare)(credentials.password, user.password);
    if (!isPasswordMatched)
        throw auth_responses_1.AuthResponses.INVALID_CREDENTIALS;
    const privateKey = (0, key_generate_1.getPrivateKey)();
    const accessToken = (0, jsonwebtoken_1.sign)({ id: user._id, role: user.role }, privateKey, { algorithm: "RS256" });
    console.log(`roleId : ${role._id}, roleName: ${role.name}, accessToken : ${accessToken}`);
    return { roleId: role._id, roleName: role.name, accessToken };
});
const logout = () => {
};
exports.default = {
    register, login, logout
};
//# sourceMappingURL=auth.services.js.map