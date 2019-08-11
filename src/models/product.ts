import { Document } from "mongoose";
import { IProduct } from "../infra/product";

export interface IProductModel extends IProduct, Document {
}