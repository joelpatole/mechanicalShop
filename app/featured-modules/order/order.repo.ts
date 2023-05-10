import { FilterQuery, Schema, UpdateQuery } from "mongoose"
import { orderModel } from "./order.schema"
import { IOrder, IOrderRequest } from "./order.type"
import { Paggination, status } from "../../utility/constant"




const create = async(order : IOrderRequest)=>{
    return await orderModel.create(order)
}

const getAllOrders = async(reqStatus:Number, filter : FilterQuery<IOrderRequest>,pageNumber : Number)=>{
    const dataPerPage = Paggination.count
    return await orderModel.find({isDeleted : false,status:reqStatus, ...filter}).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage);                                                      
}

const approveOrderRequest = async(order_id: String)=>{
    await orderModel.findByIdAndUpdate({_id:order_id},{status:status.approved});
    return await orderModel.find({_id:order_id});
}

const deleteRequest = async(filter:FilterQuery<IOrder>,data : UpdateQuery<IOrder> )=>{
    console.log(filter)
    const result = await orderModel.findOneAndUpdate(filter,data);
    return result;
}

export default{
    create,
    getAllOrders,
    approveOrderRequest,
    deleteRequest
}