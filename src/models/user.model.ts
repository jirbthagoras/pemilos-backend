import mongoose from "mongoose";
const { Schema, model } = mongoose;

// The user schema, why the name not voter? Cuz, admin is also a user wkwk.
const userSchema = new Schema({
     // One of the credentials used by user to vote. A NISN
     username: {
          type: String,
          required: true,
          unique: true
     },
     // The real name of user
     name: {
          type: String,
          required: true,
     },
     // Role, whether is admin or voter
     role: {
          type: String,
          required: true,
          enum: ["voter", "admin"]
     },
     // Class, if the user is staff or teacher, just write so.
     class: {
          type: String,
          required: true
     },
     // Password, credentials of user will be used.
     password: {
          type: String,
          required: true,
     }
})

export const User = model("User", userSchema);