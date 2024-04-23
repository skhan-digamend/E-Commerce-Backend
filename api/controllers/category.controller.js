import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";
import multer from "multer";
import multerS3 from "multer-s3";
import { generateS3FileUrl, s3 } from "../utils/s3UploadClient.js";





const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'khan-bucket01', // Replace with your S3 bucket name
    key: function (req, file, cb) {
      const folderName = 'CategoryImages'; // Specify your desired folder name
      const filename = `${folderName}/${Date.now().toString() + '-' + file.originalname}`;
      cb(null, filename);
    }
  })
});


// Create Category
export const createCategory = async (req, res, next) => {

  upload.single('image')(req,res,async function (error){
    console.log(key);
    if(error){
      console.log("Error uploading image:",error);
    return res.status(500).json({error:"Failed to upload image"})
    }
  })
  const categoryName = req.body;

  // if (!req.user.isAdmin) {
  //   return next(errorHandler(403, "You are not allowed to create a category"));
  // }
  if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })

  if (!categoryName) {
    return next(errorHandler(400, "Please provide all the required fields "));
  }
  
const CategoryImage=req.file;
  // const imageUrl=req.file.location;
  const newCategory = new Category({
    ...req.body,
    url:generateS3FileUrl(CategoryImage.key),
    // userId: req.user._id,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(errorHandler(error));
  }
};





//Get all category
export const getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await Category.find({});
    res.status(200).json({allCategory})
  } catch (error) {
    next(error)
  }
};




// Delete Category
export const deleteCategory = async (req, res, next) => {
  // if (!req.user.isAdmin || req.user._id !== req.params.userId) {
  //   return next(
  //     errorHandler(403, "You are not allowed to delete this category")
  //   );
  // }
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json("Category deleted ");
  } catch (error) {
    next(error);
  }
};




// Edit Category
export const editCategory = async (req, res, next) => {
  // if (!req.user.isAdmin || req.user._id != req.params.userId) {
  //   return next(errorHandler(403, "You are not allowed to edit this post"));
  // }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          categoryName: req.body.categoryName,
        },
      },
      { new: true } //to update the new one
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};


// Get single category
export const getCategoryById = async(req,res,next)=>{
  const category = await Category.findById(req.params.id);
  if(!category){
    res.status(500).json({message: 'Category with the given id was not exist'});
  }
  res.status(200).send(category);

}