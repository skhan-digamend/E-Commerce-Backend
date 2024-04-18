import Asset from "../models/asset.model.js"
import { bytesToSize } from "../utils/bytesToSize.js";
import { errorHandler } from "../utils/error.js";
import { generateS3FileUrl } from "../utils/s3UploadClient.js";

const getFileExtension = (filename) => {
  return filename.split('.').pop();
};


// Create a Single Asset
export const createAsset = async (req, res, next) => {
  try {
  if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })
 const uploadedFiles=req.files;
const {assetName,price,description}=req.body;

const files =  uploadedFiles.map((file) => ({
  name: file.originalname,
  type: file.mimetype,
  size: bytesToSize(file.size),
  format: getFileExtension(file.originalname),
  url:generateS3FileUrl(file.key)
 
}));

const asset = new Asset({
  assetName,
  price,
  description,
  files
})

const createdAssets = await Asset.insertMany(asset);

res.status(201).json({
    message: 'Successfully uploaded ' + req.files.length + ' files!',
    files: req.files
  })
}

   catch (error) {
      console.error('Error creating assets:', error);
  
      // Check if error is a Mongoose validation error
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation error. Please check your input data.' });
      }
  
      next(errorHandler(error));
    
  }
};


// Get All Assets
export const getAllAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find();
    res.status(200).json({ assets });
  } catch (error) {
    console.error('Error fetching assets:', error);
    next(errorHandler(error));
  }
};


// Delete Asset
export const deleteAsset = async (req, res, next) => {
  if (!req.user.isAdmin || req.user._id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this category")
    );
  }
  try {
    await Asset.findByIdAndDelete(req.params.assetId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

//get Assets by Category 


//edit assets

export const editAssets = async (req, res, next) => {
  if (!req.user.isAdmin || req.user._id != req.params.userId) {
    return next(errorHandler(403, "You are not allowed to edit this post"));
  }
  try {
    const updatedAssets = await Asset.findByIdAndUpdate(
      req.params.assetId,
      {
        $set: {
          assetName: req.body.assetName,
          Id: req.body.Id,
          fileSize: req.body.fileSize,
          fileFormat: req.body.fileFormat,
          price: req.body.price,
          category: req.body.category,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedAssets);
  } catch (error) {
    next(error);
  }
};

export const getAssetsById = async (req, res, next) => {
  const assets = await Asset.findById(req.params.id).populate("category");
  if (!assets) {
    res.status(500).json({ success: false });
  }
  res.send(assets);
};









// export const createAsset = async (req, res, next) => {
//   try{
//     const uploadFile = upload.single('file');
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//   const { assetName, Id, fileSize, fileFormat, price, category } = req.body;
//   const {originalname,key,location}=req.file;


//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "You are not allowed to create a category"));
//   }
 


//   const existcategory = await Category.findById(req.body.category);
//   if (!existcategory) {
//     return next(errorHandler(400, "invalid category"));
//   }

//   const newAsset = new Asset({
//     ...req.body,
//     assetName:assetName,
//     s3key:key,
//     url:location
//   });

//   const savedAsset = await newAsset.save();
//   res.status(201).json(savedAsset);
//   }
//   catch (error) {
//     next(errorHandler(error));
//   };}

// Delete asset