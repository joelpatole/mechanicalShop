"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const constant_1 = require("../../utility/constant");
const orderSchema = new base_schema_1.BaseSchema({
    shop_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: Number,
        default: constant_1.status.pending,
    },
    quantity: {
        type: Number,
        required: true,
    },
    product_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
exports.orderModel = (0, mongoose_1.model)("Order", orderSchema);
//# sourceMappingURL=order.schema.js.map