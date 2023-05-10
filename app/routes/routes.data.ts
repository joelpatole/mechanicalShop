import { Route } from "./routes.types";
import routers from "../featured-modules/routes.index";
import AuthRouter from "../auth/auth.routes";
import { ExcludedPath, ExcludedPaths } from "../utility/authorize";
import router from "../auth/auth.routes";

export const routes: Route[] = [
    new Route("/auth", AuthRouter),
    new Route("/product", routers.ProductRouter),
    new Route("/user", routers.UserRouter),
    new Route("/role", routers.RoleRouter),
    new Route("/shop",routers.ShopRouter),
    new Route("/order",routers.OrderRoutes),
    new Route("/sales-request",routers.SalesRequestRoute),
    new Route("/reward",routers.RewardRoute),
    new Route("/redeem",routers.RedeemRequestRoute)

]

export const excludedPaths: ExcludedPaths = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/shop/see-all-shops", "GET"),
    new ExcludedPath("/shop/get-a-shop/", "GET"),
    new ExcludedPath("/shop/rate-a-shop", "POST"),
];