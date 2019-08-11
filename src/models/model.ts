import { Model } from "mongoose";
import { IProductModel } from "./product";
import { IPurchaseModel } from "./purchase";
import { IPriceChangeModel } from "./priceChange";
import { ICardModel } from './card';


export interface IModel {
  product: Model<IProductModel>;
  purchase: Model<IPurchaseModel>;
  priceChange: Model<IPriceChangeModel>;
  card: Model<ICardModel>;
}