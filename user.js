const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    name:String,
    email:String,
    phone:Number,
    usertype:String,

});


const usermodel=mongoose.model("User",userSchema);

module.exports=usermodel;