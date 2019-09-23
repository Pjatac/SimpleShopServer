"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.priceChangeSchema = new mongoose_1.Schema({
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
        required: true
    }
});
