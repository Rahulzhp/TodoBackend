const mongoose= require("mongoose");

const AuthShema=mongoose.Schema({
    Username:String,
    Email:String,
    Pass:String,
    DOB:String

})

const AuthModel=mongoose.model("User",AuthShema)

module.exports={
    AuthModel
}