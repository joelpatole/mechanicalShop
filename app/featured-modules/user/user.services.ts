import { FilterQuery, Schema, UpdateQuery } from "mongoose";
import { IUser } from "./user.types";
import userRepo from "./user.repo";
import { roles } from "../../utility/constant";
import { USER_RESPONSES } from "./user.responses";
import { IShop } from "../shop/shop.type";
import productServices from "../product/product.services";
import shopService from "../shop/shop.service";
import ratingService from "../review/rating.service";

const find = (filter: FilterQuery<IUser>) => userRepo.find({ role: roles.OWNER, ...filter });
const findOne = (filter: FilterQuery<IUser>) => userRepo.findOne(filter);

const create = async (user: IUser) => {
    try {
        const existingUser = await userRepo.findOne({ email: user.email });
        if (existingUser) throw USER_RESPONSES.USER_ALREADY_EXIST;
        return userRepo.create(user);
    } catch (err) {
        throw err;
    }
}

const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => userRepo.update(filter, data);

const getDetialsOfShop = async(shop:IShop)=>{
    const result = await productServices.getProductDetialsOfShop(shop);
    return result
}

const getAllShops = async(filter : FilterQuery<IShop>,pageNumber : Number)=>{
    const allShops = await shopService.findAll(filter,pageNumber);
    let finalResult = []
    for(let singleShop of allShops){
      finalResult.push({shop_id : singleShop._id,
                 Name:singleShop.name,
                 contact : singleShop.contact,
                 email : singleShop.email,
                 address : singleShop.address,
                 location : singleShop.location,
                 rating : singleShop.rating
    })
    }
    console.log(finalResult)
    return finalResult;
}

const getAShop = async(filter:FilterQuery<IShop>)=>{
    const shop = await shopService.find(filter)
    const finalResult = {
        shop_id : shop[0]._id,
        Name : shop[0].name,
        contact : shop[0].contact,
        email : shop[0].email,
        address : shop[0].address,
        location : shop[0].location,
        rating : shop[0].rating
    }
    return finalResult;
}

// const rateAShop = async(shop_id:Schema.Types.ObjectId,rating : Number)=>{
//     console.log("inside userServices")


//     const result = await ratingService.rateAShop(shop_id,rating);
//     return result;
// }

export default {
    find,
    findOne,
    create,
    update,
    getDetialsOfShop,
    getAllShops,
    getAShop
}