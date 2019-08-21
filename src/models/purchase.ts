import { Document } from "mongoose";

export interface IPurchaseModel extends Document {
    purchases: [
        {
            name: string;
            qnt: number;
            price: number;
            cost: number;
        }
    ]
}