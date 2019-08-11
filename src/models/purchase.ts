import { Document } from "mongoose";
import { IPurchase } from "../infra/purchase";

export interface IPurchaseModel extends IPurchase, Document {
}