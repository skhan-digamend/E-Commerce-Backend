import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

//signup Functionality
export const signup = async (req, res,next) => {
  const { username, email, phone, password, confirmpassword } = req.body;

  if (
    !username ||
    !email ||
    !phone ||
    !password ||
    !confirmpassword||
    username === "" ||
    email === "" ||
    phone === "" ||
    password === ""||
    confirmpassword===""
  ) {
    next(errorHandler(400,'All fields are required'));
  }

  if (password !== confirmpassword) {
    next(errorHandler(400, 'Password do not match'));
  }

  const hashedPassword= bcryptjs.hashSync(password,10);

  const newUser = new User({
    username,
    email,
    phone,
    password:hashedPassword,
    confirmpassword :hashedPassword
  });
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};


//Signin functionality

export const signin = async(req,res,next)=>{

}
