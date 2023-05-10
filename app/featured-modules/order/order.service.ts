import { FilterQuery, Schema } from "mongoose";
import productServices from "../product/product.services";
import orderRepo from "./order.repo";
import { OrderResponses } from "./order.responses";
import { IItem , IOrder, IOrderRequest} from "./order.type";
import shopService from "../shop/shop.service";
import { orderStatusHelper } from "../../utility/enumUtil";

const create = async (order: IOrder) => {
  try {
    const orderList = [];
    for(let item of order.items){
      console.log(item.productName)
       const product = await productServices.find(item.product_id);
       
       const orderDetail = {
        product_id:item.product_id,
        quantity:item.quantity,
        status : order.status,
        shop_id:order.shop_id
       }  
       const result = await orderRepo.create(orderDetail);     
       if (!result) throw OrderResponses.ORDER_NOT_REGISTERED;
      orderList.push(result);
    }
    return orderList;
  } catch (err) {
    throw err;
  }
};

const getAllOrdersByStatus = async (reqStatus : Number, filter : FilterQuery<IOrderRequest> ,pageNumber : Number) => {
  try {
    // const allOrders = await orderRepo.getAllOrders().populate("product_id");
    const res = []
    //status pending
    const allOrders = await orderRepo.getAllOrders(reqStatus,filter,pageNumber);
    // console.log(allOrders);
    for(let i=0;i<allOrders.length;i++){
      const product = await productServices.findById(allOrders[i].product_id);
      res.push({order_id : allOrders[i]._id,
        product_id : product?._id,
        productName : product?.name,
        status : orderStatusHelper.convertEnumValueToString(allOrders[i].status),
        shop_id:allOrders[i].shop_id,
        quantity : allOrders[i].quantity
      });
    }
    return res;
  } catch (err) {
    throw err;
  }
};

const approveOrderRequest = async(order_id:String)=>{
  try{
    const result  =  await orderRepo.approveOrderRequest(order_id); 
    console.log(`orer servoces`);
    console.log(`order result = ${result}`);
    if(!result || result.length == 0) throw OrderResponses.ORDERS_NOT_FOUND

    const {status, _id, shop_id, quantity, product_id} = result[0];
    const statusString = orderStatusHelper.convertEnumValueToString(status);
    const finalRestult = {
      _id, shop_id, quantity, product_id,
      status: statusString
    }
    
    if(!finalRestult) throw OrderResponses.ORDERS_NOT_FOUND
    console.log(`shop_id is ${result[0].shop_id}`)
    await shopService.updateShopInventory(result[0].shop_id, result[0].product_id, result[0].quantity)

    return finalRestult;
  }catch(err){
    throw err;
  }
}

const deleteRequest = async(order_id: Schema.Types.ObjectId)=>{
  const result = await orderRepo.deleteRequest({_id : order_id, status : 1},[{$set:{isDeleted : true}}])
  return result;
}



export default {
  create,
  getAllOrdersByStatus,
  approveOrderRequest,
  deleteRequest
};
