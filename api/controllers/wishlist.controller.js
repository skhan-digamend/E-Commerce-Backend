// import wishList from "../models/wishlist.model.js";
// import Asset from "../models/asset.model.js";
// import User from "../models/user.model.js";
// import { errorHandler } from "../utils/error.js";

// //wishlist


//  // Add a product to the user's wishlist

// export const AddProductToWishlist= async (req,res,next)=>{
//     try{

//         const {id}= req.user;
//         const {prodId} = req.body;
//         const wishuser = await User.findById(id);
//         if(!wishuser){
//                 return next(errorHandler(403, "Users not Found"));
                  
//             }

//             const selectedProduct = await Asset.findById(prodId);
//         if(!selectedProduct){
//             return next(errorHandler(403,"Product not Found"));
//         }

//         const wishlist = await wishList.findOne(id);
//         if (wishlist && wishlist.products.includes(prodId)) {
//             return res.status(400).json({ error: 'Product already in wishlist'});
//         }

//         // If wishlist doesn't exist, create a new one
//         if (!wishlist) {
//             const newWishlist = new wishlist({
               
//                 products: [prodId]
//             });
//             await newWishlist.save();
//             return res.status(201).json(newWishlist);
//         }

//         // Add the product to the wishlist
//         wishlist.products.push(prodId);
//         await wishlist.save();
//         res.status(200).json(wishlist);

        

//     }
//     catch (error) {
//         next(error);
//       }
// }
//         // check is the user exist
       
//         // const wishuser = await User.findById(req.params.email);
//         // if(!wishuser){
//         //     return next(errorHandler(403, "Users not Found"));
              
//         // }
//         // //check if the product exist
//         // const selectedProduct = await Asset.findById(productID);
//         // if(!selectedProduct){
//         //     return next(errorHandler(403,"Product not Found"));
//         // }

//         // // Check if the product is already in the wishlist

//         // const wishlist = await wishList.findOne(req.params.email);
//         // if (wishlist && wishlist.products.includes(productID)) {
//         //     return res.status(400).json({ error: 'Product already in wishlist' });
//         // }

//         // // If wishlist doesn't exist, create a new one
//         // if (!wishlist) {
//         //     const newWishlist = new wishlist({
//         //        email: req.params.email,
//         //         products: [req.params.assetId]
//         //     });
//         //     await newWishlist.save();
//         //     return res.status(201).json(newWishlist);
//         // }

//         // // Add the product to the wishlist
//         // wishlist.products.push(req.params.assetId);
//         // await wishlist.save();
//         // res.status(200).json(wishlist);

    



// // router.post('/like', async (req, res) => {
// //     try {
// //         const { userId, productId } = req.body;

// //         // Check if the user exists
// //         const user = await User.findById(userId);
// //         if (!user) {
// //             return res.status(404).json({ error: 'User not found' });
// //         }

// //         // Check if the product exists
// //         const product = await Product.findById(productId);
// //         if (!product) {
// //             return res.status(404).json({ error: 'Product not found' });
// //         }

// //         // Check if the product is already in the wishlist
// //         const wishlist = await Wishlist.findOne({ userId });
// //         if (wishlist && wishlist.products.includes(productId)) {
// //             return res.status(400).json({ error: 'Product already in wishlist' });
// //         }

// //         // If wishlist doesn't exist, create a new one
// //         if (!wishlist) {
// //             const newWishlist = new Wishlist({
// //                 userId,
// //                 products: [productId]
// //             });
// //             await newWishlist.save();
// //             return res.status(201).json(newWishlist);
// //         }

// //         // Add the product to the wishlist
// //         wishlist.products.push(productId);
// //         await wishlist.save();
// //         res.status(200).json(wishlist);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).json({ error: 'Server Error' });
// //     }
// // });

// // module.exports = router;












// // router.post("/addToWishlist", async(req, res) =>{
// //     try{
  
// //       //query for specified user
// //       const user = await Users.findOne({
// //         email: req.body.email,
// //         password: req.body.password
// //       });
  
// //       //query for all products except for what's on the list
// //       let stuff = await Products.find(
// //             {_id:{ $not: {$in:[...user.wishlist.items]}}
// //         });
// //         res.status(200).json({ // or res.send/res.render
// //           data: stuff
// //         })
// //       });
// //     }
// //     catch(err){
  
// //       res.status(500).json({ // or res.send/res.render
// //         message: err.message
// //       })
// //     }
// //   });