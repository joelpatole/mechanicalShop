import { FilterQuery, Schema, UpdateQuery } from "mongoose";
import { IShop } from "./shop.type";
import shopRepo from "./shop.repo";
import { IUser } from "../user/user.types";
import userRepo from "../user/user.repo";
import userServices from "../user/user.services";
import { genSalt, hash } from "bcryptjs";
import { IOrder, IOrderRequest, IOrderRequestType } from "../order/order.type";
import redeemRequestServices from "../redeem-request/redeem-request.services";

const encryptPassword = async (user: IUser) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(user.password, salt);
  user.password = hashedPassword;
  return user;
};

const find = (filter: FilterQuery<IShop>) => {
  return shopRepo.find(filter);
};

const findAll = async (filter: FilterQuery<IShop>, pageNumber: Number) => {
  return await shopRepo.findAll(filter, pageNumber);
};

const findById = (filter: Schema.Types.ObjectId) => {
  console.log(`shop_id in shop service is `, filter);
  return shopRepo.findOne(filter);
};

const getTopShops = async (queryType: string) => {
  return await shopRepo.getTopShops(queryType);
};

const createShop = async (shop: IShop, owner: IUser) => {
  owner = await encryptPassword(owner);
  const createdOwner = await userServices.create(owner);
  shop.owner_id = createdOwner._id;
  return await shopRepo.createShop(shop);
};

const updateShopInventory = async (
  shop_id: Schema.Types.ObjectId,
  product_id: Schema.Types.ObjectId,
  quantity: Number
) => {
  console.log(`!!!!!!!!!!!!!!!!${shop_id}`);
  const shop = await shopRepo.findOne(shop_id);
  console.log(`shop in shopServices is ${shop}`);
  console.log(`inventory len in shopServices is ${shop?.inventory?.length}`);
  const a = shop?.inventory?.length;
  let inventoryPresent = false;
  let result;
  if (shop?.inventory !== undefined) {
    if (shop.inventory.length > 0) {
      for (let i = 0; i < shop.inventory.length; i++) {
        const temp = "" + shop.inventory[i].productId + "";
        const temp2 = "" + product_id;
        if (temp === temp2) {
          shop.inventory[i].quantity =
            shop.inventory[i].quantity + Number(quantity); // converts Number to number
          console.log(`new quantity is ${shop.inventory[i].quantity}`);
          inventoryPresent = true;
          break;
        }
      }

      if (!inventoryPresent) {
        shop?.inventory.push({
          productId: product_id,
          quantity: Number(quantity),
        }); //converts number to Number
        //result = await shopRepo.updateShopInventory(shop_id, shop.inventory)
      }
      console.log(`new inventory in shopServices is ${shop.inventory}`);
      result = await shopRepo.updateShopInventory(shop_id, shop.inventory);
      //return result;
    } else {
      shop?.inventory.push({
        productId: product_id,
        quantity: Number(quantity),
      }); //converts number to Number
      result = await shopRepo.updateShopInventory(shop_id, shop.inventory);
    }
  }
  return result;
};

const getShopByRatings = async(sortBy : number)=>{
  const result = await shopRepo.getShopBasedOnRating(sortBy)
  return result
}

const update = async (shop_id: Schema.Types.ObjectId,value: {[key:string]:Number}) => {
  console.log('key is',value.key);
  console.log('value is ',value);
  const key = Object.keys(value);
  console.log("key is,",key)
    console.log("reward points i.e value in shopservice is, ", value);
    if(key[0] === 'rating'){
      const result = await shopRepo.update({_id : shop_id},[{ $set: value }]);
      return result;  
    }
    const result = await shopRepo.update({_id : shop_id},{ $inc: value });
    return result;
  };


const updateQuantity = async(shop_id : Schema.Types.ObjectId,
  productId: Schema.Types.ObjectId,
  quantity : Number)=>{
  const result = await shopRepo.update({_id :  shop_id, 'inventory.productId' : productId},{$inc :{'inventory.$.quantity' : quantity} })
  console.log(result);
  return result
}



const seeGiftHistory = async (shop_id: Schema.Types.ObjectId) => {
  console.log("shop service");
  const result = await redeemRequestServices.seeGiftHistory(shop_id);
  console.log("result in shop services,", result);
  return result;
};


export default {
  find,
  findById,
  findAll,
  getTopShops,
  createShop,
  updateShopInventory,
  seeGiftHistory,
  updateQuantity,
  update,
  getShopByRatings
};
