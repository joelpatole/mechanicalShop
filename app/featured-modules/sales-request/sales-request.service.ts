import { Schema } from "mongoose";
import productServices from "../product/product.services";
import shopService from "../shop/shop.service";
import { IShop } from "../shop/shop.type";
import {
  ISalesRequest,
  ISalesRequestType,
  ISoldItem,
} from "./sales-request.types";
import { status } from "../../utility/constant";
import salesRequestRepo from "./sales-request.repo";
import { orderStatusHelper } from "../../utility/enumUtil";

const getProductDetialsOfShop = async (shop: IShop) => {
  const result = productServices.getProductDetialsOfShop(shop);
  return result;
};

const registerSales = async (
  shop_id: Schema.Types.ObjectId,
  items: Pick<ISoldItem, "product_id" | "quantity">[]
) => {
  const shop = await shopService.findById(shop_id);
  let salesRequestObject = {};
  let items_sold = [];
  let totalRevenu: Number = 0;
  let rewardPoints: Number = 0;
  let totalRewardPoints: Number = 0;
  if (shop !== undefined || shop !== null) {
    for (let i = 0; i < items.length; i++) {
      let singleProduct = await productServices.findById(items[i].product_id);
      if (singleProduct !== undefined) {
        let total: Number =
          Number(items[i].quantity) * Number(singleProduct?.price);
        totalRevenu = Number(totalRevenu) + Number(total);
        rewardPoints =
          Number(rewardPoints) + Number(singleProduct?.rewardPoints);
        totalRewardPoints = Number(totalRewardPoints) + Number(rewardPoints);

        items_sold.push({
          product_id: singleProduct?._id,
          productName: singleProduct?.name,
          quantity: items[i].quantity,
          price_per_product: singleProduct?.price,
          total: total,
          rewardPoints: rewardPoints,
        });
      }
    }

    salesRequestObject = {
      shop_id: shop?._id,
      items_sold: items_sold,
      totalRevenu: totalRevenu,
      totalRewardPoints: totalRewardPoints,
      status: status.pending,
    };

    const result = await salesRequestRepo.createSalesRequest(
      salesRequestObject
    );
    return result;
  }
};

const getSalesRequest = async (params: String,pageNumber:Number) => {
  const status = orderStatusHelper.convertStringToEnumValue(params);
  const result = await salesRequestRepo.getSalesRequest(status,pageNumber);
  return result;
};

const updateSalesRequestStatus = async (_id: String, stringStatus: String) => {
  const statusValue = orderStatusHelper.convertStringToEnumValue(stringStatus);
  const salesRequest_id = Object(_id);
  const salesRequestResult = await salesRequestRepo.updateSalesRequestStatus(salesRequest_id,statusValue
  );
  if(statusValue == status.approved) {
    if (salesRequestResult){
      let finalRestult = {
        _id: salesRequestResult?.id,
        shop_id: salesRequestResult?.shop_id,
        items_sold: salesRequestResult?.items_sold,
        totalRevenu: salesRequestResult?.totalRevenu,
        totalRewardPoints: salesRequestResult?.totalRewardPoints,
        status: orderStatusHelper.convertEnumValueToString(salesRequestResult?.status),
      };
    const shop = await shopService.findById(salesRequestResult.shop_id);
    let shopInventory = shop?.inventory;
    if(shopInventory != undefined)
    {
        //update total reward and total revenu
        const rewardPoints = finalRestult.totalRewardPoints;
        const shopRevenu = finalRestult.totalRevenu;
        await shopService.update(salesRequestResult.shop_id, {rewardPoints : rewardPoints});
        await shopService.update(salesRequestResult.shop_id, {shopRevenu:shopRevenu});
        for(let eachProduct of salesRequestResult.items_sold){
        {
          let newQuantity = Number(eachProduct.quantity) * -1
          const result = await shopService.updateQuantity(
            salesRequestResult.shop_id,
            eachProduct.product_id, 
            newQuantity);
        }
        }
    }
      return finalRestult;
    } else {
      throw SALES_REQUEST.SOMETHING_WENT_WRONG;
    }
  }
};

export default {
  getProductDetialsOfShop,
  registerSales,
  getSalesRequest,
  updateSalesRequestStatus,
};
