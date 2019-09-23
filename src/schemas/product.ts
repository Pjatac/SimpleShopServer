import { Schema } from "mongoose";

export var productSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    qnt: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    currPrice: {
        type: Number,
        required: true,
        min: 0.09
    },
    priceChange: {
        type: Number
    }
});