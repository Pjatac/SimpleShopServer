import { Schema } from "mongoose";

export var priceChangeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
});