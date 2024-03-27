import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

//signup Functionality
export const signup = async (req, res, next) => {
  const { username, email, phone, password, confirmpassword } = req.body;

  if (
    !username ||
    !email ||
    !phone ||
    !password ||
    !confirmpassword ||
    username === "" ||
    email === "" ||
    phone === "" ||
    password === "" ||
    confirmpassword === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  if (password !== confirmpassword) {
    next(errorHandler(400, "Password do not match"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    phone,
    password: hashedPassword,
    confirmpassword: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};

//Signin functionality

export const signin = async (req, res, next) => {
  const {email, password,confirmpassword} = req.body;

  if(!email || !password || !email=== '' ||  password === ''){
    next(errorHandler(400, 'All fields are required'));
  }
  try{
    const validUser = await User.findOne({email});
    if(!validUser){
     return next(errorHandler(404,'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
     return next(errorHandler(400,'Invalid password'));
    }
    const token = jwt.sign(
      {id: validUser._id}, process.env.JWT_SECRET);

      //to hide the passwasd from the returned signin information and return the same for security purpose
      //separating password and rest of the information and sending the rest.
      const{ password: pass,confirmpassword: confirmpassword, ...rest}= validUser._doc;


      res.status(200).cookie('access_token', token,{
        httpOnly: true,
      })
      .json(rest);
  }catch(error){
    next(error);

  }
};

//signin as guest

export const signinasguest = async (req, res, next) => {
  const {username,phone,password,confirmpassword} = req.body;

  if(!username || !phone || !username=== '' ||  phone === ''){
    next(errorHandler(400, 'All fields are required'));
  }
  try{
    const validGuestUsername = await User.findOne({username});
    if(!validGuestUsername){
     return next(errorHandler(404,'Invalid username'));
    }
    const validGuestPhone = await User.findOne({phone});
    if(!validGuestPhone){
     return next(errorHandler(400,'Phone number not exist'));
    }
    const token = jwt.sign(
      {id: validGuestUsername._id}, process.env.JWT_SECRET);

      //to hide the passwasd from the returned signin information and return the same for security purpose
      //separating password and rest of the information and sending the rest.
      const{ password: pass,confirmpassword: confirmpassword, ...rest}= validGuestUsername._doc;


      res.status(200).cookie('access_token', token,{
        httpOnly: true,
      })
      .json(rest);
  }catch(error){
    next(error);

  }
};
