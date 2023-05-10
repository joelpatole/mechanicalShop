import { FilterQuery, Schema, UpdateQuery } from "mongoose";
import { productModel } from "./product.schema";
import { IProduct } from "./product.types";

const find = async(filter: FilterQuery<IProduct>) => await productModel.find({ isDeleted: false, ...filter });

const findOne = async(filter: FilterQuery<IProduct>) => await productModel.findOne({ isDeleted: false, ...filter });

const findById = async (product_id: Schema.Types.ObjectId | String) => {
  console.log('product  id is ',product_id)
  const product = await productModel.findById({_id:product_id});
  console.log("product is ",product);
  return product
}

const addProducts = async (product: IProduct) => await productModel.create(product);

const update = (filter: FilterQuery<IProduct>, data: UpdateQuery<IProduct>) => productModel.updateMany({ isDeleted: false, ...filter }, data);

export default {
    find,
    findOne,
    findById,
    addProducts,
    update
}