import authServices from "../auth/auth.services"
import roleServices from "../featured-modules/role/role.services";
import { adminData, roleData } from "./constant"


export const populate = async () => {
    roleData.forEach(role => roleServices.add(role));
    adminData.forEach(admin => authServices.register(admin));
}