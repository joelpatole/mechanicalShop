"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_routes_1 = __importDefault(require("./role/role.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const shop_routes_1 = __importDefault(require("./shop/shop.routes"));
const order_routes_1 = __importDefault(require("./order/order.routes"));
const sales_request_routes_1 = __importDefault(require("./sales-request/sales-request.routes"));
const reward_routes_1 = __importDefault(require("./reward/reward.routes"));
const redeem_request_routes_1 = __importDefault(require("./redeem-request/redeem-request.routes"));
exports.default = {
    RoleRouter: role_routes_1.default,
    UserRouter: user_routes_1.default,
    ProductRouter: product_routes_1.default,
    ShopRouter: shop_routes_1.default,
    OrderRoutes: order_routes_1.default,
    SalesRequestRoute: sales_request_routes_1.default,
    RewardRoute: reward_routes_1.default,
    RedeemRequestRoute: redeem_request_routes_1.default
};
//# sourceMappingURL=routes.index.js.map