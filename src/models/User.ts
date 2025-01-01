import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role?: string;
  image?: string;
  authProviderId?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  role: { type: String, default: "users" },
  image: { type: String },
  authProviderId: { type: String },
});

console.log("Defining user model...");

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
