import { Document } from "mongoose";
import { IPriceChange } from "../infra/priceChange";

export interface IPriceChangeModel extends IPriceChange, Document {
}