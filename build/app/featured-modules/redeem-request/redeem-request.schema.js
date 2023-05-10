"use strict";
// const RewardSchema = new BaseSchema({
//     name: {
//         type: String,
//         required: true
//     },
//     rewardPoints: {
//         type: Number,
//         required: true,
//         default: 0
//     }
// })
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeemRequestModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const constant_1 = require("../../utility/constant");
const RedeemRequestSchema = new base_schema_1.BaseSchema({
    gift_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    shop_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rewardPoints: {
        type: Number,
        required: true
    },
    shopOwner: {
        type: String,
        required: true
    },
    shopAddress: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: constant_1.status.pending
    }
});
exports.RedeemRequestModel = (0, mongoose_1.model)("redeemrequest", RedeemRequestSchema);
//# sourceMappingURL=redeem-request.schema.js.map