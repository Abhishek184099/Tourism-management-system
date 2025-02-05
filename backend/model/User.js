const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
   name : {
    type : String,
    required : true,
   },

    email: {
        type: String,
        required: true,
        unique: true,
   },
   password: {
    type: String,
    required: true,
    minlength: 6,
   },
   role : {
    type: String,
    default: "user",
   },
   preferences: {
    interests: {
      type: [String], 
      default: [], 
    },
  },
},{timestamps:true});

const User = mongoose.model("User", UserSchema);
module.exports = User;

