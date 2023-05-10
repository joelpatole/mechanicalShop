"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const routes_types_1 = require("./routes.types");
const routes_index_1 = __importDefault(require("../featured-modules/routes.index"));
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
const authorize_1 = require("../utility/authorize");
exports.routes = [
    new routes_types_1.Route("/auth", auth_routes_1.default),
    new routes_types_1.Route("/product", routes_index_1.default.ProductRouter),
    new routes_types_1.Route("/user", routes_index_1.default.UserRouter),
    new routes_types_1.Route("/role", routes_index_1.default.RoleRouter),
    new routes_types_1.Route("/shop", routes_index_1.default.ShopRouter),
    new routes_types_1.Route("/order", routes_index_1.default.OrderRoutes),
    new routes_types_1.Route("/sales-request", routes_index_1.default.SalesRequestRoute),
    new routes_types_1.Route("/reward", routes_index_1.default.RewardRoute),
    new routes_types_1.Route("/redeem", routes_index_1.default.RedeemRequestRoute)
];
exports.excludedPaths = [
    new authorize_1.ExcludedPath("/auth/login", "POST"),
    new authorize_1.ExcludedPath("/shop/see-all-shops", "GET"),
    new authorize_1.ExcludedPath("/shop/get-a-shop/", "GET"),
    new authorize_1.ExcludedPath("/shop/rate-a-shop", "POST"),
];
//# sourceMappingURL=routes.data.js.map