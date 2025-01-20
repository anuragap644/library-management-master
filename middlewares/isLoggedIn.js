const jwt=require('jsonwebtoken');
const userModel=require("../models/userModel");

module.exports =async (req,res,next)=>{
    if(!req.cookies.token){
        return res.send("You need to login first").redirect("/");
    }
    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user= await userModel
           .findOne({email:decoded.email})
           .select("-password");
        
        req.user=user;
        next();
    }
    catch(err){
        
        res.send("Something went wrong").redirect("/");
    }
};