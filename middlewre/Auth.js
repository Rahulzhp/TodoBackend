
const jwt=require("jsonwebtoken")
require("dotenv").config()


const Auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decode=jwt.verify(token,"rhl")
        if(decode){
            let Login_id=decode.course;
            console.log(Login_id)
            req.body.User_Id=Login_id
            next()
        }
        else{
            res.send("please login ")
        }
    }
    else{
        res.send("please login ")
    }

}
module.exports={
    Auth
}