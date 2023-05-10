import { FilterQuery, Schema } from "mongoose";
import { IProduct, ProductType } from "./product.types";
import { productModel } from "./product.schema";
import productRepo from "./product.repo";
import { IInventory, IShop } from "../shop/shop.type";

const find = async (filter: FilterQuery<IProduct>) => {
  return await productRepo.find(filter);
};

const findById = async (product_id: Schema.Types.ObjectId | String) => {
  return await productRepo.findById(product_id);
};

const addProducts = async (product: IProduct) => {
  return await productRepo.addProducts(product);
};

const extractAllProductsFromShopInventory = async (inventoryArray: IInventory[]) => {
   console.log("inventory arry in product.service.ts extractAllProductsFromShopInventory");
   console.log(inventoryArray);
  let finalProductArray : unknown[] = [];
  if (inventoryArray.length < 1) {
    return finalProductArray;
  } else {
    for (let i = 0; i < inventoryArray.length; i++) {
      let singleProduct = await productRepo.findById(
        inventoryArray[i].productId
      );
      console.log("single product is ", singleProduct);
      finalProductArray.push({
        product_id: singleProduct?._id,
        name: singleProduct?.name,
        price: singleProduct?.price,
        rewardPoints: singleProduct?.rewardPoints,
        threshold: singleProduct?.threshold,
        quantity: inventoryArray[i].quantity,
      });
    }
  }
  console.log("final Product array is, ", finalProductArray);
  return finalProductArray;
};

const getProductDetialsOfShop = async (shop: IShop) => {
   console.log('shop in product services')
  let finalProductArray: unknown[] = [];
  let result = {
   shopId: shop._id,
   Name: shop.name,
   rewardPoints : shop.rewardPoints,
   shopRevenu : shop.shopRevenu,
   shopBranch : shop.location,
   shopAddress : shop.address,
   shopInventory: finalProductArray,
 };
  if(shop?.inventory !== undefined && shop?.inventory.length !== 0 )
  {
   finalProductArray = await extractAllProductsFromShopInventory(shop?.inventory)
    console.log("final Product array is, ", finalProductArray);
    result.shopInventory = finalProductArray
    return result;
  }
  else {
    return result;
  }
  }
  

export default {
  find,
  findById,
  addProducts,
  extractAllProductsFromShopInventory,
  getProductDetialsOfShop,
};
