"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.purchaseSchema = new mongoose_1.Schema({
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
//# sourceMappingURL=purchase.js.map