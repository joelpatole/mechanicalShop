"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const productSchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    threshold: {
        type: Number,
        required: true
    },
    rewardPoints: {
        type: Number,
        default: 0
    }
});
exports.productModel = (0, mongoose_1.model)("Product", productSchema);
//# sourceMappingURL=product.schema.js.map