import express from 'express'
import Cart from '../models/cart.model.js'


//create cart
export const createCart = async (req,res,next)=>{
    const newCart = new Cart(req.body);
    
try {
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
    
} catch (error) {
    return res.status(500).json(err);
}

}


//update cart

export const UpdateCart = async (req,res,next)=>{
try {
    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,{$set: req.body,},{new: true}
    );
    return res.status(200).json(updatedCart);
} catch (error) {
    return res.status(500).json(err);
}
}


//get user cart

export const getUserCart= async (req,res,next)=>{
    try {
        const cart = await Cart.find({ userId: req.params.userId });
        return res.status(200).json(cart);
      } catch (err) {
        returnres.status(500).json(err);
      }
}

//delete particular item from cart

export const RemoveItemFromCart = async (req,res,next)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}