import { FilterQuery, Schema, UpdateQuery } from "mongoose";
import { shopModel } from "./shop.schema";
import { IInventory, IShop } from "./shop.type";
import { IOrderRequest, IOrderRequestType } from "../order/order.type";
import { Paggination } from "../../utility/constant";

const findAll = async(filter : FilterQuery<IShop>, pageNumber:Number)=>{
    const dataPerPage = Paggination.count
    return await shopModel.find({...filter}).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage).sort({'rating' : -1});
}


const updateShopRating = async(shop_id : Schema.Types.ObjectId, data : UpdateQuery<IShop>)=>{
  const result = await shopModel.updateOne({_id : shop_id},{$set:{["data"] : data}})
}


const find = async(filter :FilterQuery<IShop>)=>{
    return await shopModel.find({ isDeleted: false, ...filter });
}

const findOne = async(filter : Schema.Types.ObjectId)=>{
    const restult =  await shopModel.findById(filter)
    return restult;
}

const findById = async(shop_id : string)=>{
    const shop = await shopModel.findById(shop_id)
    return shop
}

const getTopShops = async(queryType : string)=>{
    const result = await shopModel.aggregate([
        {$match:{ [queryType] :{$gte:0} }},
        {$sort : {[queryType]:-1}},
        {$limit:(10)}
        
    ])
    console.log(result);
    return result;
}

const createShop = async(shop:IShop)=>{
    return await shopModel.create(shop);
}

const updateShopInventory = async(shop_id:Schema.Types.ObjectId, inventory : unknown)=>{
    console.log(`inventory is ${inventory}`)
    console.log(`shop_id in shop.repo is ${shop_id}`)
    const result = await shopModel.findByIdAndUpdate({_id:shop_id},{inventory : inventory})
    console.log("&&&&&&&&&&&&&&&&&    ",result);
    return result;
}

const getShopBasedOnRating = async(sortBy : any)=>{
   const shop = await shopModel.aggregate([
    {$sort : {rating : sortBy}},
    {$limit: (1)}
   ])
   return shop;
}

const update = async(filter: FilterQuery<IShop>, data : UpdateQuery<IShop>)=>{
    console.log("inside shop.repo.ts");
    console.log(data)
    const result =  await shopModel.updateMany(filter,data)
    console.log(result)
    return result;
}


export default {
    find,
    findOne,
    getTopShops,
    createShop,
    findById,
    updateShopInventory,
    getShopBasedOnRating,
    findAll,
    updateShopRating,
    update
}