import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
