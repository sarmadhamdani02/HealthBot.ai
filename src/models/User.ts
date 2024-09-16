import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    role: { type: String, default: "users" },
    image: { type: String },
    // Google provider
    authProviderId: { type: String },
});

console.log("Defining user model...");

// Check if the model is already defined
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;