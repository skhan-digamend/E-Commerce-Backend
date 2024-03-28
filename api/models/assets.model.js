import mongoose from 'mongoose';

const assetSchema= new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
    },{timestamps: true}
);
const Asset = mongoose.model('Asset',assetSchema);

export default Asset;