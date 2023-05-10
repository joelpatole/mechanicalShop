import { Router,Request,Response,NextFunction } from "express";
import orderService from "./order.service";
import { ResponseHandler } from "../../utility/response.handler";
import { roles, status } from "../../utility/constant";
import { orderStatusHelper } from "../../utility/enumUtil";
import { permit } from "../../utility/authorize";
import { ORDER_ID_VALIDATOR, ORDER_PRODUCT_VALIDATOR } from "./order.validation";
import { OrderResponses } from "./order.responses";
const router = Router()

//middleware to check if owner
router.post('/order-items',permit([roles.OWNER]),ORDER_PRODUCT_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const order = req.body;
      const result = await orderService.create(order)
      res.send(new ResponseHandler(result))
    }catch(err){
        next(err)
    }
})

//middleware to check if admin
router.get('/get-all-orders',permit([roles.ADMIN]),async(req,res,next)=>{
  try{
    // const requestStatus = req.query['status'];
    const {status,page,...rest} = req.query;
    console.log('status is ',status);
    console.log('rest is ',rest);
    const pageNumber = page
    console.log("page is", pageNumber)
    // let orderStatus : status = status.unknown;

    //this is required because conveting query param string to enum value is 
    //not supported out of the box. String can be undefined when you get it
    //using req.quer['status'] and direct converstion is not allowed because of this 'undefined'
    //eg: var enumValue : status = (<any>status)[requestStatus] does not work;
    //One way to do it is by using below custom function.
    const orderStatusEnumValue = orderStatusHelper.convertStringToEnumValue(status);
    
    const result = await orderService.getAllOrdersByStatus(orderStatusEnumValue,rest,Number(pageNumber));
    res.send(new ResponseHandler(result))

  }catch(err){
     next(err);
  }
})

router.patch('/approve-order-request/:order_id',permit([roles.ADMIN]),async(req,res,next)=>{
  try{
    console.log(req.params.order_id)
   const result = await orderService.approveOrderRequest(req.params.order_id);
   res.send(new ResponseHandler(result));
  }catch(err){
    next(err);
  }
})

router.delete('/delete-order-request/:order_id',permit([roles.OWNER]),ORDER_ID_VALIDATOR,async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const order_id = req.params.order_id
    const result = await orderService.deleteRequest(Object(order_id))
    if(!result) throw OrderResponses.CANNOT_DELETE_ORDER
    res.send(new ResponseHandler({OrderDeleted : result}));
  
  }catch(err){
    next(err)
  }
})



export default router;