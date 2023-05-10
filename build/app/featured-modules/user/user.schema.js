"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const userSchema = new base_schema_1.BaseSchema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        ref: "Role"
    }
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
//if we want to add new field in a perticular document
// Article.findByIdAndUpdate(id, { $set: { day: 'example' }}, { new: true }, function (err, article) {
//     if (err) return handleError(err);
//     res.send(article);
//   });
//i dont want admin to have default inventory 
//i only want to create it if the user is owner
//# sourceMappingURL=user.schema.js.map