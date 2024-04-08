import mongoose from "mongoose";


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
const userIdeaSchema = new mongoose.Schema(
  {
    
          name: {
            type: String,
            required: true,
            unique: true,
          },
          email: {
            type: String,
            required: true,
            validate:{
              validator:validateEmail,
              message: props =>
            `${props.value} is not a valid email`
            }
          },
          phone: {
            type: Number,
            required: true,
           min:[10]
          },
          idea:{
            type: String,
            required:[true, "Idea is required"],
          }
  },
  { timestamps: true }
);
const UserIdea = mongoose.model("UserIdea", userIdeaSchema);

export default UserIdea;
