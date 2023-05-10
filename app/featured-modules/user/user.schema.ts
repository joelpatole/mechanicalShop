import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { UserType } from "./user.types";


const userSchema = new BaseSchema({

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

})

export const userModel = model<UserType>("User", userSchema);



//if we want to add new field in a perticular document

// Article.findByIdAndUpdate(id, { $set: { day: 'example' }}, { new: true }, function (err, article) {
//     if (err) return handleError(err);
//     res.send(article);
//   });
  
//i dont want admin to have default inventory 
//i only want to create it if the user is owner