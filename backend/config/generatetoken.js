const jwt=require("jsonwebtoken");

const generatetoken=async(userid)=>{
    //Generating a token
    console.log("Generating token");
    const token= jwt.sign({userid},process.env.SECRET_KEY,{
        expiresIn:"30d",
    });
    
    console.log(token)
    return token
}

module.exports=generatetoken;