import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

const wishList = mongoose.model("wishlist", wishlistSchema);

export default wishList;
