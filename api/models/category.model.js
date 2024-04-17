import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categoryImage:{
      type:String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fcategory-management.html&psig=AOvVaw1Y5DO5gd2hXcIcL18N6kGO&ust=1712651595396000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODMtsCasoUDFQAAAAAdAAAAABAI"
    }
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);

export default Category;
