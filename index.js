const express=require("express");
const app=express();

const {connection}= require("./Config/db")
const {TodoRouter}=require("./Routes/Todo.route")
const {AuthRoute}=require("./Routes/Auth.route")
var cors = require('cors')
const {Auth}=require("./middlewre/Auth")
require("dotenv").config()
app.use(express.json())
app.use(cors({
    "origin":"*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.get("/",(req,res)=>{
    res.send("welcome to home page");
})

app.use("/user",AuthRoute)
app.use(Auth)
app.use("/todo",TodoRouter)


app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(er){
        console.log("er",er)
    }
    console.log(`server is running port ${process.env.port}`)
})