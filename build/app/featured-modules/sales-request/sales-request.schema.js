"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRequestModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const constant_1 = require("../../utility/constant");
const salesRequestSchema = new base_schema_1.BaseSchema({
    shop_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    items_sold: {
        type: [
            {
                product_id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    required: true
                },
                productName: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price_per_product: {
                    type: Number,
                    required: true
                },
                total: {
                    type: Number,
                    required: true
                },
                rewardPoints: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    totalRevenu: {
        type: Number,
        required: true
    },
    totalRewardPoints: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: constant_1.status.pending
    }
});
exports.salesRequestModel = (0, mongoose_1.model)("salesRequest", salesRequestSchema);
//# sourceMappingURL=sales-request.schema.js.map