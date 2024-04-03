import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset",
      },
    ],
  },
  { timestamps: true }
);

const wishList = mongoose.model("wishlist", wishlistSchema);

export default wishList;
