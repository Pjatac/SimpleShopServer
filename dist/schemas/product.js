"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
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
//# sourceMappingURL=product.js.map