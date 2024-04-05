import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: true,
    },
    Id: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    fileFormat: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  { timestamps: true }
);

const Asset = mongoose.model("asset", assetSchema);

export default Asset;
