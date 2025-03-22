import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  uid: string;
  password?: string;
  role?: string;
  image?: string;
  authProviderId?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  uid: {
    type: String,
    required: true,
  },
  password: { type: String, select: false },
  role: { type: String, default: "users" },
  image: { type: String, default: "" },
  authProviderId: { type: String },
});

// Check if the model already exists in mongoose.models to prevent overwriting
const User: Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
