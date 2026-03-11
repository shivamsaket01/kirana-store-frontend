import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
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
    phone: {
      type: String,
      required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
      type: String,
      default: "user"   // admin ya user
    },
    addresses: [
      {
        street: String,
        city: String,
        zip: String,
        isDefault: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
