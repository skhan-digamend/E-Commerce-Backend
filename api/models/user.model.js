import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      default: false,
    },
    userDesignIdea:{
      type: String,
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
