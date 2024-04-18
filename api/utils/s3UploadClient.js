import AWS from "aws-sdk";
import multer from "multer";
import multers3 from "multer-s3";



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION });
  
  const s3= new AWS.S3();
  
  
 export const upload=multer({
    storage:multers3({
        s3:s3,
        bucket:'khan-bucket01',
        key:(req,file,cb)=>{
          cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
  })

  export const uploadFiles=upload.array('inputFile', 3);

  export const generateS3FileUrl = (key) => {
    return `https://khan-bucket01.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  };


  