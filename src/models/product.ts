import { Document } from "mongoose";

export interface IProductModel extends Document {
    name: string;
    qnt: number;
    currPrice: number;
    priceChange?: number;
}