import { compare, genSalt, hash } from "bcryptjs";
import { IUser } from "../featured-modules/user/user.types";
import userServices from "../featured-modules/user/user.services";
import { ICredentials } from "./auth.types";
import { AuthResponses } from "./auth.responses";
import { getPrivateKey } from "../utility/key.generate";
import { sign } from "jsonwebtoken";
import roleServices from "../featured-modules/role/role.services";

const encryptPassword = async (user: IUser) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
    return user;
}

const register = async (user: IUser) => {
    user = await encryptPassword(user);
    const result = userServices.create(user);
    return result;
}

const login = async (credentials: ICredentials) => {
    const user = await userServices.findOne({email: credentials.email});
    const role = await roleServices.findOne(user?.role);
    console.log(user)
    if(!user) throw AuthResponses.USER_NOT_FOUND;
    
    const isPasswordMatched = await compare(credentials.password, user.password);
    if(!isPasswordMatched) throw AuthResponses.INVALID_CREDENTIALS;

    const privateKey = getPrivateKey();
    const accessToken = sign({id: user._id, role: user.role}, privateKey, { algorithm: "RS256" });
    console.log(`roleId : ${role._id}, roleName: ${role.name}, accessToken : ${accessToken}`)
    return {roleId : role._id,roleName: role.name, accessToken};
}

const logout = () => {

}

    export default {
    register, login, logout
}