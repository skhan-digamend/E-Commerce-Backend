import wishList from "../models/wishlist.model.js";
import Asset from "../models/asset.model.js";
import User from "../models/user.model.js";

//wishlist

// const User = require('../models/User');

// // Add a product to the user's wishlist
// router.post('/like', async (req, res) => {
//     try {
//         const { userId, productId } = req.body;

//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Check if the product exists
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         // Check if the product is already in the wishlist
//         const wishlist = await Wishlist.findOne({ userId });
//         if (wishlist && wishlist.products.includes(productId)) {
//             return res.status(400).json({ error: 'Product already in wishlist' });
//         }

//         // If wishlist doesn't exist, create a new one
//         if (!wishlist) {
//             const newWishlist = new Wishlist({
//                 userId,
//                 products: [productId]
//             });
//             await newWishlist.save();
//             return res.status(201).json(newWishlist);
//         }

//         // Add the product to the wishlist
//         wishlist.products.push(productId);
//         await wishlist.save();
//         res.status(200).json(wishlist);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server Error' });
//     }
// });

// module.exports = router;
