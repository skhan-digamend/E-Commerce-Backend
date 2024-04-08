// import { errorHandler } from "../utils/error.js";
// import UserIdea from "../models/useridea.model.js";
// import nodemailer from "nodemailer";

// export const sendIdea = async (req,res,next)=>{
//     const {name,email,phone,idea}=req.body;
//     var from = req.body.email;
//     var to = "priyakavi805@gmail.com";
//     var subject = "New Idea";
//     var message = req.body.idea;

//     var transporter = nodemailer.createTransport({
//         service: 'gamil',
//             auth:{
//                 user:'kavipriya2912002@gmail.com',
//                 pass:'rpvhxgletbsisrhe'
//             }
//     });

//     var mailOptions={
//         from:'kavipriya2912002@gmail.com',
//         to:'priyakavi805@gmail.com',
//         subject:'email sent by ',
//         html:' <h1>Welcome</h1>'
//     };

//     transporter.sendMail(mailOptions, function(error,info){
//         if(error){
//             console.log(error);

//         }
//         else{
//             console.log('Email sent: '+ info.res)
//         }
//     })


// }
