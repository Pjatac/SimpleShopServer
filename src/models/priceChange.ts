import { Document } from "mongoose";

export interface IPriceChangeModel extends Document {
    name: string;
    price: number;
    date: Date;
}