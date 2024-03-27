import mongoose from "mongoose";

const billingUserSchema = new mongoose.Schema(
  {
    firstname:{
        type: String,
        required:true,
      },
      lastname:{
        type:String,
        required:true,
      },
      addressline1:{
        type: String,
        required: true,
      },
      addressline2:{
        type: String,
        required:false,
      },
      country:{
        type: String,
        required:true,
      },
      region:{
        type:String,
        required:false,
      },
      city:{
        type:String,
        required:true,
      },
      zipcode:{
        type:String,
        required:true,
      },
},
{ timestamps: true }
);

const BillingInfo = mongoose.model("User", billingUserSchema);

export default BillingInfo;
