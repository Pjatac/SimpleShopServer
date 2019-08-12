"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.cardSchema = new mongoose_1.Schema({
    card: [
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
            }
        }
    ]
});
//# sourceMappingURL=card.js.map