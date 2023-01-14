const mongoose= require("mongoose");

const todoShema=mongoose.Schema({
    Task:String,
    Status:Boolean,
    Tag:String,
    User_Id:String
})

const TodoModel=mongoose.model("todo",todoShema)

module.exports={
    TodoModel
}