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
    poly: {
      type: String,
    },
    description: {
      type: String,
    },
    assetImage: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mathisfunforum.com%2Fviewtopic.php%3Fid%3D27719%26action%3Dnew&psig=AOvVaw03Q1IlsmRZOeAnmgBp7Foj&ust=1712653953122000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMiG0KWjsoUDFQAAAAAdAAAAABAI",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model("asset", assetSchema);

export default Asset;
