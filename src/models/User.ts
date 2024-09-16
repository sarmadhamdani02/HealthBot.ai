import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String, select: false },
    role: { type: String, default: "Users" },
    image: { type: String },
    // Google provider
    authProviderId: { type: String },
});

console.log("Defining user model...");

// Check if the model is already defined
export const User = mongoose.models?.User || mongoose.model("Users", userSchema);