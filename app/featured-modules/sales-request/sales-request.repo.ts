import { FilterQuery, Schema } from "mongoose";
import { salesRequestModel } from "./sales-request.schema"
import { ISalesRequest, ISalesRequestType } from "./sales-request.types"
import { Paggination } from "../../utility/constant";



const createSalesRequest = async(salesRequestObject : unknown)=>{
  const result = await salesRequestModel.create(salesRequestObject);
  return result;
}

// const dataPerPage = Paggination.count
// return await orderModel.find({status:reqStatus, ...filter}).skip(Number(pageNumber) * dataPerPage).limit(dataPerPage); 

const getSalesRequest = async(status : Number,pageNumber : Number)=>{
     const dataPerPage = Paggination.count
     const result = await salesRequestModel.find({status:status}).skip(Number(pageNumber)*dataPerPage).limit(dataPerPage);
     return result;
}

const updateSalesRequestStatus = async(_id : Schema.Types.ObjectId,status : Number)=>{
    await salesRequestModel.findByIdAndUpdate({_id:_id},{status:status})
    const result = await salesRequestModel.findById(_id);
    return result;
}

export default{
    createSalesRequest,
    getSalesRequest,
    updateSalesRequestStatus
}