import { Schema } from "mongoose";

export var purchaseSchema: Schema = new Schema({
    purchases: [
        {
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 30
            },
            qnt: {
                type: Number,
                required: true,
                min: 1,
                max: 100
            },
            price: {
                type: Number,
                required: true,
                min: 0.01
            },
            cost: {
                type: Number,
                required: true,
                min: 0.1
            }
        }
    ]
});