import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type:String,required:true},
    password : {type:String,required:true},
    id:{type:String}
})

const UserSchema = mongoose.model("User", User)
export default UserSchema;