"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const ratingSchema = new base_schema_1.BaseSchema({
    shop_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    ratingArray: {
        type: [],
        required: true
    },
    averageRating: {
        type: Number,
        required: true
    }
});
exports.RatingModel = (0, mongoose_1.model)("rating", ratingSchema);
//# sourceMappingURL=rating.schema.js.map