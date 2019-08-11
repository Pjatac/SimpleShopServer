import { Document } from "mongoose";
import { ICard } from "../infra/card";

export interface ICardModel extends ICard, Document {
}