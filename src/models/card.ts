import { Document } from "mongoose";

export interface ICardModel extends Document {
    card: [
        {
            
            name: string;
            qnt: number;
            price: number;
        }
    ]
}